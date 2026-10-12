import asyncio
import json
import subprocess
import sys
import urllib.request
import websockets

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
URL = "http://127.0.0.1:8080/index.html"
DEBUG_PORT = 9240

async def verify_fixes():
    cmd = [
        EDGE_PATH,
        "--headless=new",
        f"--remote-debugging-port={DEBUG_PORT}",
        "--disable-gpu",
        URL
    ]
    proc = subprocess.Popen(cmd)
    ws = None
    try:
        ws_url = None
        for _ in range(30):
            await asyncio.sleep(0.5)
            try:
                req = urllib.request.urlopen(f"http://127.0.0.1:{DEBUG_PORT}/json")
                pages = json.loads(req.read().decode())
                target_pages = [p for p in pages if "8080" in p.get("url", "")]
                if target_pages:
                    ws_url = target_pages[0]["webSocketDebuggerUrl"]
                    break
            except Exception:
                pass

        if not ws_url:
            raise RuntimeError(f"Could not connect to Edge on port {DEBUG_PORT}")

        ws = await websockets.connect(ws_url)

        req_id = 0
        async def send(method, params=None):
            nonlocal req_id
            req_id += 1
            payload = {"id": req_id, "method": method, "params": params or {}}
            await ws.send(json.dumps(payload))
            while True:
                resp = json.loads(await ws.recv())
                if resp.get("id") == req_id:
                    return resp.get("result", {})

        async def eval_js(expr):
            res = await send("Runtime.evaluate", {
                "expression": expr,
                "awaitPromise": True,
                "returnByValue": True
            })
            if "exceptionDetails" in res:
                raise RuntimeError(f"JS Exception: {res['exceptionDetails']}")
            return res.get("result", {}).get("value")

        await send("Console.enable")
        await send("Runtime.enable")
        await send("Page.enable")

        for _ in range(20):
            has_ready = await eval_js("Boolean(window.GeminiEngine && window.App)")
            if has_ready:
                break
            await asyncio.sleep(0.5)

        print("\n=======================================================")
        print("VERIFYING SYMPTOM CHAT ENGINE & COMPACT SIDEBAR")
        print("=======================================================\n")

        # ----------------------------------------------------
        # TEST 1: Symptom Query: "fever and headache"
        # ----------------------------------------------------
        fever_res = await eval_js("""
        (async function() {
            const res = await GeminiEngine.chat("fever and headache");
            const text = res.text;
            const hasWelcome = text.includes("How may I assist your health journey today");
            const hasCauses = text.includes("Possible Causes") || text.includes("Viral");
            const hasHydration = text.includes("Hydration") || text.includes("Liters");
            const hasDoctor = text.includes("Medical Evaluation") || text.includes("Physician");
            const hasMeds = text.includes("Active Medication") || text.includes("Paracetamol") || text.includes("NSAID");
            return { hasWelcome, hasCauses, hasHydration, hasDoctor, hasMeds, textPreview: text.slice(0, 120) };
        })()
        """)
        print("1. Fever & Headache Response:", fever_res)
        assert not fever_res["hasWelcome"], "Returned welcome message instead of symptom guidance!"
        assert fever_res["hasCauses"] and fever_res["hasHydration"] and fever_res["hasDoctor"], "Missing clinical sections!"
        print("✓ Fever & headache symptom query returned clinical guidance without welcome message!")

        # ----------------------------------------------------
        # TEST 2: Symptom Query: "stomach pain"
        # ----------------------------------------------------
        stomach_res = await eval_js("""
        (async function() {
            const res = await GeminiEngine.chat("stomach pain");
            const text = res.text;
            const hasWelcome = text.includes("How may I assist your health journey today");
            const hasBlandDiet = text.includes("khichdi") || text.includes("curd") || text.includes("Bland");
            const hasMetformin = text.includes("Metformin");
            const hasDoctor = text.includes("Medical Evaluation") || text.includes("Physician");
            return { hasWelcome, hasBlandDiet, hasMetformin, hasDoctor, textPreview: text.slice(0, 120) };
        })()
        """)
        print("2. Stomach Pain Response:", stomach_res)
        assert not stomach_res["hasWelcome"], "Returned welcome message instead of GI guidance!"
        assert stomach_res["hasBlandDiet"] and stomach_res["hasMetformin"] and stomach_res["hasDoctor"], "Missing GI / Metformin guidance!"
        print("✓ Stomach pain returned personalized GI guidance respecting active Metformin!")

        # ----------------------------------------------------
        # TEST 3: Query: "what should I take?"
        # ----------------------------------------------------
        take_res = await eval_js("""
        (async function() {
            const res = await GeminiEngine.chat("what should I take?");
            const text = res.text;
            const hasWelcome = text.includes("How may I assist your health journey today");
            const hasMeds = text.includes("Metformin") || text.includes("Active Prescriptions");
            const hasChecklist = text.includes("Doctor Consultation Checklist") || text.includes("prescribe");
            return { hasWelcome, hasMeds, hasChecklist, textPreview: text.slice(0, 120) };
        })()
        """)
        print("3. Medication Inquiry Response:", take_res)
        assert not take_res["hasWelcome"], "Returned welcome message instead of medication intake guidance!"
        assert take_res["hasMeds"] and take_res["hasChecklist"], "Missing active prescriptions or doctor checklist!"
        print("✓ 'What should I take?' returned structured medication guidance respecting vault!")

        # ----------------------------------------------------
        # TEST 4: Pure Greeting: "hello"
        # ----------------------------------------------------
        hello_res = await eval_js("""
        (async function() {
            const res = await GeminiEngine.chat("hello");
            const text = res.text;
            const hasWelcome = text.includes("How may I assist your health journey today");
            return { hasWelcome };
        })()
        """)
        print("4. Pure Greeting Response:", hello_res)
        assert hello_res["hasWelcome"], "Pure greeting should provide welcome capabilities!"
        print("✓ Pure greeting correctly welcomes user to vault!")

        # ----------------------------------------------------
        # TEST 5: Sidebar Compact Spacing Inspection
        # ----------------------------------------------------
        sidebar_res = await eval_js("""
        (function() {
            App.gotoState(3);
            const sidebar = document.getElementById('app-sidebar');
            const navItems = [...sidebar.querySelectorAll('.sidebar-nav-item')];
            const allItemsHavePy2 = navItems.every(el => el.classList.contains('py-2'));
            const stabilityCard = sidebar.querySelector('.sidebar-widget-details');
            const hasCompactStability = stabilityCard && stabilityCard.classList.contains('p-2.5');
            const scrollHeight = sidebar.scrollHeight;
            const clientHeight = sidebar.clientHeight;
            return {
                itemCount: navItems.length,
                allItemsHavePy2,
                hasCompactStability,
                scrollHeight,
                clientHeight
            };
        })()
        """)
        print("5. Sidebar Compact Layout:", sidebar_res)
        assert sidebar_res["allItemsHavePy2"], "Sidebar items should have py-2!"
        assert sidebar_res["hasCompactStability"], "Stability index card should have compact p-2.5 padding!"
        print("✓ Sidebar layout is compact, using py-2 across all 9 items!")

        print("\n=======================================================")
        print("ALL FINAL POLISH ACCEPTANCE VERIFICATIONS 100% PASSED!")
        print("=======================================================\n")

    finally:
        if ws: await ws.close()
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except Exception:
            proc.kill()

if __name__ == "__main__":
    asyncio.run(verify_fixes())
