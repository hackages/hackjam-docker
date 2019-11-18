from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'Hey I m in a container ! oO ! and my Name is: '+str(os.environ['name']) 

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
