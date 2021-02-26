from flask import Flask, request, render_template, url_for, jsonify

import RPi.GPIO as GPIO
from time import sleep

app = Flask(__name__)

@app.route('/turn-on', methods=['GET'])
def turnOnFan():
    if request.headers.get('Token') == <<API_KEY>>:
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(11, GPIO.OUT)

        p = GPIO.PWM(11, 50)
        p.start(0)

        p.ChangeDutyCycle(3) # left -90 deg position
        sleep(1)
        p.ChangeDutyCycle(5.5) # neutral position
        sleep(1)

        p.stop()
        GPIO.cleanup()
        return jsonify('on')
    
    else: return jsonify('Invalid Token')


@app.route('/turn-off', methods=['GET'])
def turnOffFan():
    if request.headers.get('Token') == <<API_TOKEN>>:
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(11, GPIO.OUT)

        p = GPIO.PWM(11, 50)
        p.start(0)
    
        p.ChangeDutyCycle(9) # right +90 deg position
        sleep(1)
        p.ChangeDutyCycle(5.5) # neutral position
        sleep(1)

        p.stop()
        GPIO.cleanup()
        return jsonify('off')

    else: return jsonify('Invalid Token')


if __name__ == '__main__':
    app.run(debug=False)
