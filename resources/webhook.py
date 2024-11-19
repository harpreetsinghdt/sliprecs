from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        # Log for debugging purposes
        print("Webhook received!")

        # Call the shell script to deploy or pull the latest changes
        os.system('/var/www/sliprecs/webhook-handler.sh')

        return "Webhook received and processed successfully.", 200
    return "Method not allowed.", 405

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
