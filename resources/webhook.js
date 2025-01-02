const http = require("http");
const { exec } = require("child_process");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/webhook") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const payload = JSON.parse(body);
      if (payload.ref === "refs/heads/main") {
        console.log("New push detected. Deploying...");

        exec(
          "cd /var/www/your-app && git pull origin main && ./deploy.sh",
          (err, stdout, stderr) => {
            if (err) {
              console.error(`Error during deployment: ${stderr}`);
              return res.writeHead(500).end("Deployment failed");
            }

            console.log(`Deployment output: ${stdout}`);
            res.writeHead(200).end("Deployment successful");
          }
        );
      } else {
        res.writeHead(400).end("Invalid branch");
      }
    });
  } else {
    res.writeHead(404).end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
