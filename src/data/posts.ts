export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "My DIY Home Lab Firewall Build (OPNsense Edition)",
    slug: "home-lab-firewall-opnsense",
    date: "2023-11-19",
    tags: ["homelab", "firewall", "networking", "opnsense"],
    excerpt: "How I turned an old mini-PC into a powerful, open-source firewall for my home lab.",
    content: `
  ### Why Build Your Own Firewall?
  
  If you’re like me, you’ve probably outgrown the basic router your ISP gave you. I wanted more control, better security, and a fun weekend project, so I decided to build my own firewall using OPNsense. Bonus: I got to repurpose some aging hardware collecting dust in the closet.
  
  ---
  
  ### Hardware & Prep
  
  **What I used:**
  - Old Intel NUC (i3, 4GB RAM, 64GB SSD)
  - 2x USB Gigabit Ethernet adapters (because the NUC only had one NIC)
  - 8GB USB stick for installation
  
  **Tip:** Any small form factor PC will do. Just make sure you have at least two network interfaces (one for WAN, one for LAN).
  
  ---
  
  ### Installing OPNsense
  
  1. **Download the OPNsense ISO:**  
     [Official OPNsense Downloads](https://opnsense.org/download/)
  
  2. **Burn ISO to USB:**  
     On Linux/Mac:
     \`\`\`bash
     sudo dd if=OPNsense-*.img of=/dev/sdX bs=1M status=progress
     \`\`\`
     (Replace \`/dev/sdX\` with your USB drive.)
  
  3. **Boot and Install:**  
     - Plug USB into your mini-PC, boot, and follow the installer prompts.
     - Assign your interfaces (mine were em0 for LAN, ue0 for WAN).
  
  4. **Initial Setup:**  
     - Connect to LAN port, go to \`192.168.1.1\` in your browser.
     - Default login: \`root\` / \`opnsense\`.
  
  ---
  
  ### Basic Configuration
  
  - **Change the default password** (seriously, do this first).
  - **Set up DHCP** for your LAN.
  - **Configure WAN with your ISP details** (mine was DHCP, so plug and play).
  - **Update OPNsense** via the web UI.
  
  ---
  
  ### VLANs and Segmentation
  
  I wanted to keep my IoT junk away from my main devices, so I set up VLANs:
  
  - VLAN 10: Trusted devices (PCs, phones)
  - VLAN 20: IoT (smart bulbs, plugs, etc.)
  - VLAN 30: Guest WiFi
  
  OPNsense makes this easy in the Interfaces > Assignments section. Just tag your switch ports accordingly.
  
  ---
  
  ### Intrusion Detection: Suricata
  
  OPNsense comes with Suricata IDS/IPS built-in.  
  I enabled it on my WAN and LAN interfaces, using the ET Open ruleset.  
  Within 24 hours, it flagged a couple of sketchy outbound connections from a cheap smart plug-turned out it was phoning home to China. Blocked!
  
  ---
  
  ### Why This Beats Consumer Routers
  
  - **Way more visibility:** See every connection, every device.
  - **Custom firewall rules:** Block, allow, or log anything.
  - **Open-source:** No vendor lock-in, regular updates.
  - **Learning:** You’ll actually understand how your network works.
  
  ---
  
  ### Issues I Hit (and Fixed)
  
  - USB Ethernet adapters can be flaky. If you can, use real PCIe NICs.
  - Some IoT devices hate being on a separate VLAN. Had to tweak firewall rules to allow mDNS and specific ports.
  - Suricata can be chatty-tune your rules or you’ll get alert fatigue.
  
  ---
  
  ### Final Thoughts
  
  If you’re even a little bit curious about networking, building your own firewall is 100% worth it. OPNsense is stable, powerful, and surprisingly user-friendly. Plus, it feels good to know exactly what’s happening on your network.
    
  If you’ve got questions or want to share your own build, drop a comment. Next time, I’ll cover setting up WireGuard VPN on this same box!
  
  Stay secure,
  HexHawk
    `
  },  
  {
    id: "2",
    title: "Docker Compose for Lazy Devs: How I Stopped Writing Bash Scripts",
    slug: "docker-compose-for-lazy-devs",
    date: "2024-02-11",
    tags: ["docker", "devops", "containers", "automation"],
    excerpt: "How I finally ditched my messy shell scripts and started using Docker Compose for every dev project.",
    content: `
  # Docker Compose for Lazy Devs: How I Stopped Writing Bash Scripts
  
  If you’re a developer or sysadmin, you’ve probably written a dozen half-broken bash scripts to spin up local dev environments. I used to do the same-until I got tired of debugging my own spaghetti code and switched to Docker Compose. Here’s how that went, what I learned, and why I’ll never go back.
  
  ---
  
  ## Why I Ditched Bash Scripts
  
  My old workflow:
  - Clone a repo
  - Copy-paste some install commands
  - Pray that Python, Node, and Postgres all play nice on my laptop
  
  Result: Broken environments, “works on my machine” drama, and a lot of wasted time.
  
  ---
  
  ## Enter Docker Compose
  
  With Docker Compose, you define your entire stack in a single YAML file. No more “it worked last week” moments. Here’s a real example from a recent side project:
  
  \`\`\`yaml
  version: '3'
  services:
    db:
      image: postgres:15
      environment:
        POSTGRES_PASSWORD: example
      volumes:
        - db_data:/var/lib/postgresql/data
    web:
      image: nginx:alpine
      ports:
        - "8080:80"
    app:
      build: .
      environment:
        DATABASE_URL: postgres://postgres:example@db:5432/postgres
      depends_on:
        - db
  volumes:
    db_data:
  \`\`\`
  
  **What this does:**
  - Spins up a Postgres DB, an Nginx web server, and my app-all isolated, all reproducible.
  - Data persists between runs (thanks, named volumes).
  - No more “which version of Python is installed?” headaches.
  
  ---
  
  ## Actually Using It
  
  From zero to running stack:
  \`\`\`bash
  git clone https://github.com/myuser/myproject.git
  cd myproject
  docker-compose up
  \`\`\`
  
  That’s it. No more “install Postgres locally” or “pip install -r requirements.txt” on my host.
  
  ---
  
  ## Tips I Wish I Knew Earlier
  
  - **Use named volumes** for databases and uploads, so you don’t lose data every time you restart.
  - **.env files**: Keep secrets out of your docker-compose.yml.
  - **depends_on**: Make sure your app waits for the DB before starting.
  - **docker-compose down -v**: Wipes everything if you want a clean slate.
  
  ---
  
  ## Debugging Gotchas
  
  - If something fails, run \`docker-compose logs\` to see what’s up.
  - Use \`docker-compose exec service_name bash\` to poke around inside a running container.
  - Network issues? All services are on the same Docker network by default-no need to open ports unless you want to access from your host.
  
  ---
  
  ## Real World: Local Dev, CI, and Even Production
  
  I started with Compose for local dev, but now I use it for CI pipelines and even small production deployments. It’s not Kubernetes, but for most side projects, it’s overkill anyway.
  
  ---
  
  ## Final Thoughts
  
  If you’re still writing bash scripts to set up dev environments, do yourself a favor and try Docker Compose. It’s not magic, but it’ll save you hours of yak-shaving. Plus, your teammates will thank you.
    
  Any Compose horror stories or pro tips? Drop them in the comments. Next up: How I broke my cluster with a single typo (and how to avoid it).
  
  Stay lazy,
  HexHawk
    `
  }
  ,
  {
    id: "3",
    title: "Quick and Dirty WiFi Recon with Bettercap",
    slug: "wifi-recon-bettercap",
    date: "2024-05-14",
    tags: ["wifi", "pentest", "bettercap", "recon"],
    excerpt: "Using Bettercap for fast WiFi network reconnaissance-my go-to method for mapping wireless environments before a pentest.",
    content: `
  # Quick and Dirty WiFi Recon with Bettercap
  
  I do a fair bit of wireless pentesting, and sometimes you just want to map out the WiFi landscape fast-no fancy rigs, no custom scripts, just results. That’s where Bettercap comes in. Here’s how I use it for quick WiFi recon, plus a few tips from the trenches.
  
  ---
  
  ## Why Bettercap?
  
  - **Lightweight:** Runs on Kali, Parrot, or even a Raspberry Pi.
  - **Live results:** See APs and clients in real time.
  - **Scriptable:** Automate stuff if you want, but works great out of the box.
  
  ---
  
  ## What You Need
  
  - Kali Linux (or any modern pentest distro)
  - A WiFi adapter that supports monitor mode and packet injection (I use Alfa AWUS036NHA-old but gold)
  - Bettercap (pre-installed on Kali)
  
  ---
  
  ## Getting Started
  
  First, put your WiFi adapter in monitor mode. On Kali:
  
  \`\`\`bash
  sudo ip link set wlan0 down
  sudo iw wlan0 set monitor control
  sudo ip link set wlan0 up
  \`\`\`
  
  Now, launch Bettercap:
  
  \`\`\`bash
  sudo bettercap -iface wlan0
  \`\`\`
  
  ---
  
  ## Scanning for Networks and Clients
  
  Once in the Bettercap interactive shell, start WiFi recon:
  
  \`\`\`
  wifi.recon on
  \`\`\`
  
  Let it run for a minute or two. Then:
  
  \`\`\`
  wifi.show
  \`\`\`
  
  You’ll see a table of nearby APs and connected clients, including MAC addresses, signal strength, and encryption types.
    
  ---
  
  ## Filtering and Targeting
  
  Want to focus on a specific network? Filter by BSSID:
  
  \`\`\`
  set wifi.ap.bssid <target_bssid>
  wifi.recon on
  \`\`\`
  
  You can also deauth clients (for testing, with permission):
  
  \`\`\`
  wifi.deauth <client_mac>
  \`\`\`
  
  **Warning:** Only do this on networks you own or have explicit permission to test.
  
  ---
  
  ## Why I Like This Workflow
  
  - **Speed:** From boot to recon in under two minutes.
  - **Clarity:** See which clients are talking to which APs, spot rogue devices, and check for open networks.
  - **No bloat:** No need to write Python or parse pcap files unless you want to.
  
  ---
  
  ## Real-World Use Case
  
  Last month, I was asked to audit a small office’s WiFi. Five minutes with Bettercap and I found:
  - Two forgotten guest APs still running WEP (yikes)
  - A printer broadcasting its own open hotspot
  - Three IoT cameras on the wrong VLAN
  
  Sent the client a screenshot and a list of MACs. They fixed it all in a day.
  
  ---
  
  ## Pro Tips
  
  - Use a directional antenna for better range in crowded environments.
  - Pipe Bettercap output to a log file for later analysis:
    \`\`\`bash
    sudo bettercap -iface wlan0 > wifi_recon.log
    \`\`\`
  - Combine with \`airodump-ng\` if you need more detail, but for 80% of jobs, Bettercap is enough.
  
  ---
  
  ## Final Thoughts
  
  Bettercap isn’t just for MITM attacks-it’s a killer tool for wireless recon. If you’re still stuck on airmon-ng and airodump, give this a try. It’s not magic, but it’s fast, reliable, and gets the job done.
  
  Got your own WiFi recon tricks? Drop them in the comments.
  
  Stay curious,
  HexHawk
    `
  },
  {
    id: "4",
    title: "How I Automated My Backups with Restic and Rclone (and Finally Slept Well)",
    slug: "automated-backups-restic-rclone",
    date: "2024-09-17",
    tags: ["backup", "automation", "restic", "rclone", "cloud"],
    excerpt: "Setting up automated, encrypted backups to the cloud using Restic and Rclone. No more backup anxiety!",
    content: `

  Let’s be honest: most of us don’t back up our stuff until we lose something important (ask me about the time I lost my SSH keys and a week’s worth of work). After that disaster, I swore I’d automate my backups, and I wanted something secure, cheap, and easy to restore. Enter **Restic** and **Rclone**.
  
  ---
  
  ## Why Restic + Rclone?
  
  - **Restic:** Fast, deduplicating, encrypted backups. Open-source. Restores are a breeze.
  - **Rclone:** Swiss army knife for cloud storage. Supports everything from Google Drive to S3 to obscure SFTP servers.
  - **Combined:** Push your encrypted backups anywhere, automatically.
  
  ---
  
  ## My Setup
  
  - **Source:** My ~/projects and ~/Documents folders
  - **Destination:** Backblaze B2 (cheap, reliable cloud storage)
  - **Schedule:** Daily at 2am via cron
  - **Encryption:** Restic handles it natively
  
  ---
  
  ## Step 1: Install Restic and Rclone
  
  On Debian/Ubuntu:
  
  \`\`\`bash
  sudo apt update
  sudo apt install restic rclone
  \`\`\`
  
  ---
  
  ## Step 2: Configure Rclone
  
  Run:
  
  \`\`\`bash
  rclone config
  \`\`\`
  
  Follow the prompts to set up your cloud provider. Mine is Backblaze B2, but you can use Google Drive, Dropbox, S3, etc.
  
  - Name: \`b2remote\`
  - Type: \`Backblaze B2\`
  - Enter your account ID and application key
  
  Test it:
  
  \`\`\`bash
  rclone lsd b2remote:
  \`\`\`
  
  ---
  
  ## Step 3: Initialize Your Restic Repo
  
  \`\`\`bash
  export RESTIC_PASSWORD="yourSuperSecretPassword"
  restic -r rclone:b2remote:mybackups init
  \`\`\`
  
  ---
  
  ## Step 4: The Backup Script
  
  Here’s the script I use (\`backup.sh\`):
  
  \`\`\`bash
  #!/bin/bash
  
  export RESTIC_PASSWORD="yourSuperSecretPassword"
  export RESTIC_REPOSITORY="rclone:b2remote:mybackups"
  
  restic backup ~/projects ~/Documents \
    --exclude '**/node_modules' \
    --exclude '**/.cache'
  
  restic forget --prune --keep-daily 7 --keep-weekly 4 --keep-monthly 6
  
  restic check
  \`\`\`
  
  - Excludes junk like \`node_modules\` and cache folders
  - Keeps 7 daily, 4 weekly, and 6 monthly snapshots
  - Runs a repo check at the end for peace of mind
  
  ---
  
  ## Step 5: Automate with Cron
  
  Edit your crontab:
  
  \`\`\`bash
  crontab -e
  \`\`\`
  
  Add:
  
  \`\`\`
  0 2 * * * /home/hexhawk/backup.sh >> /home/hexhawk/backup.log 2>&1
  \`\`\`
  
  ---
  
  ## Restoring Files (Test This!)
  
  Restic makes restores painless:
  
  \`\`\`bash
  restic -r rclone:b2remote:mybackups restore latest --target ~/restore-test
  \`\`\`
  
  Always test your backups! (I do a dry run every month.)
  
  ---
  
  ## Troubleshooting
  
  - **Slow upload?** Use \`--limit-upload\` to avoid killing your bandwidth.
  - **Forgot your password?** Sorry, you’re out of luck-Restic encrypts everything. Store your password in a password manager!
  - **Cloud storage costs:** Backblaze B2 is cheap, but check your provider’s egress fees before restoring a lot of data.
  
  ---
  
  ## Final Thoughts
  
  Since setting this up, I actually sleep better. No more backup anxiety, no more lost files. If you’re still dragging folders to an external drive once a month, do yourself a favor and automate it.
  
  
  What’s your backup horror story? Or your favorite backup tool? Drop a comment-let’s trade war stories.
  
  Stay safe,
  HexHawk
    `
  },
  {
    id: "5",
    title: "Ransomware Simulation in Your Lab",
    slug: "ransomware-simulation-lab",
    date: "2024-10-11",
    tags: ["ransomware", "cybersecurity", "lab", "simulation"],
    excerpt: "Ever wondered how ransomware spreads? I set up a safe lab to test it-here’s what I learned, what worked, and what to watch out for.",
    content: `
  # Ransomware Simulation in Your Lab
  
  Ever wondered how ransomware actually behaves once it lands on a system? I did too-so I built a safe, isolated lab to see it in action without risking my real data. Here’s how I set it up, what I used, and what I learned.
  
  ---
  
  ## Why Simulate Ransomware?
  
  - Understand how ransomware spreads and encrypts files
  - Test your detection and response tools (EDR, backups, etc.)
  - Learn without risking your production environment
  
  ---
  
  ## Lab Setup
  
  **1. Create an Isolated Environment**  
  I spun up a Windows 10 VM using VirtualBox (any hypervisor works).  
  - Gave it 2 CPU cores, 4GB RAM, 40GB disk.
  - Disabled network bridging-host-only or NAT only, no internet access.
  - Took a clean snapshot before starting.
  
  **2. Tools Used**  
  - **EDR Simulator:** [Sandworm](https://github.com/RedTeamOperations/Sandworm) (open-source, safe for labs)
  - **Monitoring:** Sysmon for process/file monitoring, Wireshark for network traffic
  - **Backups:** Windows built-in backup plus a manual copy of test files
  
  ---
  
  ## Simulation Steps
  
  **1. Prepare the Victim**  
  - Copied a folder of “important” test docs and images to the VM.
  - Made sure Sysmon was logging and Wireshark was capturing.
  
  **2. Run the Simulation**  
  Launched the ransomware simulator in PowerShell:
  
  \`\`\`powershell
  Start-Process -FilePath "ransomware_sim.exe"
  \`\`\`
  
  - Watched as the simulator began encrypting files and renaming them.
  - Sysmon logs showed new processes, file writes, and registry changes.
  
  **3. Monitor and Respond**  
  - My EDR (Sandworm) flagged suspicious activity within seconds.
  - Wireshark showed no outbound connections (simulator was local-only).
  - Rolled back to the VM snapshot to clean up.
  
  ---
  
  ## What I Learned
  
  - **Detection:** EDR picked up the simulation quickly-alerts on process injection, file changes, and registry edits.
  - **Containment:** Snapshots and offline backups made recovery trivial.
  - **Visibility:** Sysmon and Wireshark gave a clear picture of what happened and when.
  - **Safety:** Isolation is critical! Never run malware-even simulators-on your main machine or network.
  
  ---
  
  ## Pro Tips
  
  - Always use snapshots so you can revert instantly.
  - Keep your lab network isolated-no internet, no shared folders.
  - Test your backup and restore process before you need it for real.
  - Try different simulators and EDR tools for a broader view.
  
  ---
  
  ## Final Thoughts
  
  Simulating ransomware in a lab is eye-opening. You see firsthand how fast files get encrypted and how vital detection and backup strategies are. If you’re serious about cybersecurity, set up your own lab and test your defenses-before a real attack happens.
  
  *Image: Screenshot of Sysmon logs and ransomware simulator in action (alt: "Sysmon event log showing ransomware simulation activity")*
  
  Questions or want to share your own lab setup? Drop a comment or DM me.
  
  Stay safe,  
  HexHawk
    `
  }
  ,
  {
  id: "6",
  title: "AI-Powered Log Analysis: My Weekend with Open Source LLMs",
  slug: "ai-powered-log-analysis",
  date: "2025-02-06",
  tags: ["AI", "log analysis", "python", "open source", "security"],
  excerpt: "How I used a local LLM to automate log triage and catch weirdness in my security stack-no cloud required.",
  content: `
# AI-Powered Log Analysis: My Weekend with Open Source LLMs

Ever get tired of staring at endless log files, trying to spot the weird stuff? Me too. So this May, I decided to see if the AI hype could actually save me some time. Spoiler: it can-if you set it up right.

---

## The Problem

My self-hosted stack spits out logs like it’s going out of style. Syslog, nginx, Suricata, Docker, you name it. Grepping for "error" or "fail" only gets you so far. I wanted something that could:
- Summarize what happened
- Flag the unusual stuff
- Run locally (no sending logs to OpenAI or Google)

---

## The Solution: Local LLMs

I grabbed [Ollama](https://ollama.com/) (runs Llama 3, Mistral, etc. on your own hardware) and wrote a quick Python script to feed it my logs and ask for a summary + anomalies.

---

## The Script

Here’s the core of what I built:

\`\`\`python
import subprocess

def get_logs(logfile, lines=200):
    with open(logfile, 'r') as f:
        return ''.join(f.readlines()[-lines:])

def ask_llm(prompt):
    # Using Ollama's REST API
    import requests
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "llama3", "prompt": prompt}
    )
    return response.json()["response"]

if __name__ == "__main__":
    logs = get_logs("/var/log/auth.log")
    prompt = f"Summarize the following log entries and highlight any unusual or suspicious activity:\n{logs}"
    summary = ask_llm(prompt)
    print(summary)
\`\`\`

- Replace \`/var/log/auth.log\` with any log you want.
- You can use [Ollama](https://ollama.com/) to run Llama 3 or Mistral on your own machine (no GPU required, but it helps).

---

## Real Results

I pointed this at my SSH logs and got a summary like:
> "There were 15 successful logins from your usual IPs. 3 failed attempts from 203.0.113.42-potential brute force. No root logins. No sudo failures."

Not bad for 10 minutes of setup.

---

## Gotchas

- **RAM hungry:** Even the smaller LLMs want 8GB+ RAM. My old ThinkPad was fine, but don’t try this on a Raspberry Pi.
- **Prompting matters:** Be specific in your prompt. "Summarize and highlight anomalies" works better than "What’s up?"
- **Privacy:** No data leaves your box. That’s the point.

---

## Why Bother?

- **Saves time:** No more scrolling through 10,000 lines of logs.
- **Catches the weird stuff:** Missed a brute-force attempt that wasn’t in my fail2ban filters. AI flagged it.
- **Fun weekend project:** And now I want to plug this into my alerting stack.

---

## Next Steps

- Hook into Uptime Kuma or health checks for instant summaries.
- Try fine-tuning on my own logs (if I ever get the time).
- Maybe build a web UI? (Famous last words.)

---

## Final Thoughts

AI isn’t magic, but it’s a killer assistant for boring log triage. If you’ve got a decent machine and some curiosity, give it a try. If you build something cooler, let me know-I’ll probably steal your code.

Stay curious,  
HexHawk
  `
},
{
  id: "6",
  title: "Automating OSINT Recon with Python and SpiderFoot",
  slug: "automated-osint-spiderfoot",
  date: "2025-03-19",
  tags: ["osint", "automation", "python", "recon", "spiderfoot"],
  excerpt: "How I built a simple Python workflow to automate Open Source Intelligence (OSINT) reconnaissance using SpiderFoot’s API-perfect for bug bounty, red teaming, or just satisfying curiosity.",
  content: `
# Automating OSINT Recon with Python and SpiderFoot

If you’re into bug bounty, red teaming, or just enjoy poking around the internet, you know how much time OSINT can eat up. Manual recon is fun for about five minutes, then it’s just repetitive. That’s why I started automating my OSINT workflow-and SpiderFoot made it stupidly easy.

---

## Why SpiderFoot?

- **Open-source and powerful:** Tons of modules for domains, IPs, emails, leaks, and more.
- **Web UI and API:** Use it in your browser or script it for full automation.
- **Great for both quick scans and deep dives.**

---

## Step 1: Setting Up SpiderFoot

You can run SpiderFoot locally with Docker (my preferred way):

\`\`\`bash
docker run -d -p 5001:5001 --name spiderfoot spiderfoot/spiderfoot
\`\`\`

- Access the web UI at [http://localhost:5001](http://localhost:5001)
- Set an API key in the settings (you’ll need this for scripting)

---

## Step 2: Python Script for Automated Scans

Here’s a basic script to kick off a scan and fetch results via the API:

\`\`\`python
import requests
import time

API_KEY = "your_spiderfoot_api_key"
BASE_URL = "http://localhost:5001"
TARGET = "example.com"

# Start a new scan
resp = requests.post(
    f"{BASE_URL}/api/scan/new",
    json={"target": TARGET, "modules": ["sfp_dnsresolve", "sfp_googlesearch"], "api_key": API_KEY}
)
scan_id = resp.json()["scan_id"]
print(f"Started scan: {scan_id}")

# Poll for completion
while True:
    status = requests.get(f"{BASE_URL}/api/scan/{scan_id}/status", params={"api_key": API_KEY}).json()
    print("Scan progress:", status["status"])
    if status["status"] == "FINISHED":
        break
    time.sleep(10)

# Fetch results
results = requests.get(f"{BASE_URL}/api/scan/{scan_id}/data", params={"api_key": API_KEY}).json()
for item in results["data"]:
    print(item["type"], ":", item["value"])
\`\`\`

- Replace \`your_spiderfoot_api_key\` and \`example.com\` as needed.
- You can add more modules or targets as you like.

---

## Real-World Use

I use this for:
- **Recon on bug bounty targets** (find subdomains, emails, leaks)
- **Red team pre-engagement** (map out external attack surface)
- **Personal curiosity** (what does the internet know about me?)

---

## Tips & Gotchas

- SpiderFoot can be noisy-don’t use it on sensitive targets without permission.
- Some modules need API keys (Shodan, HaveIBeenPwned, etc.).
- For large scans, consider increasing Docker memory or running on a beefier box.

---

## Final Thoughts

Automating OSINT isn’t just a time-saver-it helps you spot patterns and weak spots you’d miss manually. SpiderFoot is a great starting point, and scripting with Python lets you build it into bigger workflows.

Have your own OSINT automation tricks? Drop them in the comments or hit me up on Mastodon.

Stay curious,  
HexHawk
  `
},
{
  id: "6",
  title: "How the NIDS Classifier Works: Machine Learning for Network Intrusion Detection",
  slug: "nids-classifier-how-it-works",
  date: "2025-05-16",
  tags: ["machine learning", "network security", "python", "nids", "gradio", "NSL-KDD"],
  excerpt: "A deep dive into the architecture and logic behind my Python-based NIDS Classifier, built on the NSL-KDD dataset and powered by an interactive Gradio web app.",
  content: `
# How the NIDS Classifier Works: Machine Learning for Network Intrusion Detection

I've seen a lot of "machine learning NIDS" projects that are basically just notebooks running a random forest on some old dataset and calling it a day. I wanted something more interactive, practical, and actually useful for security folks or anyone curious about network traffic analysis. So, I built the **NIDS Classifier**-a Python app that classifies network traffic as benign or malicious, with a simple web interface and real-time results.

**Want to run it yourself?**  
[Check out the GitHub repo for installation and setup instructions.](https://github.com/HexHawk/NIDS-Classifier)

---

## The Dataset: NSL-KDD

The backbone of this project is the [NSL-KDD dataset](https://www.unb.ca/cic/datasets/nsl.html), a classic in the intrusion detection world. It's not perfect, but it's well-documented and still great for learning and prototyping.

- **What’s in it?**  
  Each row represents a network connection, with features like duration, protocol, service, flag, source/destination bytes, and more.
- **Labels:**  
  Each sample is labeled as either "normal" (benign) or one of several attack types (malicious).

---

## The Pipeline: From Raw Data to Prediction

Here’s what happens under the hood:

### 1. Data Preprocessing

- **Feature Selection:**  
  Only the features used in NSL-KDD are accepted. If you upload a CSV, the app checks for these columns.
- **Encoding:**  
  Categorical features (like protocol type, service, flag) are label-encoded to integers so the model can process them.
- **Scaling:**  
  Numeric features are scaled to ensure fair treatment by the model (using scikit-learn’s StandardScaler).

### 2. Model Training

- **Algorithm:**  
  I use a Random Forest Classifier (after testing a few others). It’s robust, interpretable, and works well with tabular data.
- **Training:**  
  The model is trained on the KDDTrain+ split of the NSL-KDD dataset. Attack types are mapped to a single “malicious” class for simplicity.
- **Feature Importance:**  
  After training, the model’s feature importances are extracted for visualization.

*Example code for training:*
\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
import pandas as pd

df = pd.read_csv('KDDTrain+.txt')
# ...preprocessing steps...
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
\`\`\`

### 3. Real-Time Classification

- **Upload:**  
  You upload your own CSV file (with the same NSL-KDD features).
- **Preprocessing:**  
  The file is checked, encoded, and scaled just like the training data.
- **Prediction:**  
  The model predicts for each row: benign or malicious.
- **Visualization:**  
  Results are displayed as a summary (how much benign vs. malicious), and a bar chart shows which features mattered most for the current classification.

### 4. Export & Analysis

- **Download:**  
  You can export the classified data as a CSV, with the prediction column added.
- **Feature Importance:**  
  The Gradio app visualizes which features were most influential (e.g., “src_bytes” or “service”).

---

## The Gradio Web Interface

I wanted this to be usable by anyone-not just Python nerds-so I built the UI with [Gradio](https://gradio.app/):

- **File upload:**  
  Drag and drop your CSV, or use the sample data.
- **Classify button:**  
  Triggers the backend pipeline.
- **Results:**  
  See counts of benign/malicious, plus a downloadable CSV.
- **Feature importance:**  
  Interactive chart shows what the model "looks at" the most.

---

## Why This Approach?

- **Reproducibility:**  
  Anyone can retrain or tweak the model using the same pipeline.
- **Transparency:**  
  Feature importance helps you understand what’s driving the predictions.
- **Interactivity:**  
  No more running scripts in a terminal and parsing logs-just use the browser.

---

## Limitations & Next Steps

- **Dataset age:**  
  NSL-KDD is old and not reflective of modern traffic. For real-world use, train on your own packet captures.
- **Feature engineering:**  
  You can extend the pipeline with more features (e.g., time-based, flow-based).
- **Model upgrades:**  
  Try other algorithms or deep learning if you want, but Random Forest is a solid baseline.

---

## Conclusion

The NIDS Classifier is a practical, interactive tool for learning about network intrusion detection with machine learning. It’s not a silver bullet, but it’s a great starting point for experimenting, prototyping, and understanding how ML can help in network security.

**Want to try it or see the code?**  
[All setup and installation details are on GitHub.](https://github.com/HexHawk/NIDS-Classifier)

If you have ideas, want to contribute, or just want to chat about NIDS and ML, drop a comment or reach out.

Stay curious,  
HexHawk
  `
}


];

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(post => post.slug === slug);
};

export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet);
};
