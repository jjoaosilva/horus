from flask import Flask
import sensor_pb2
import socket
from flask import jsonify, request
from flask_cors import CORS

sensors = [
            {'name': 'Temperatura', 'ip': 'localhost', 'port': 5002},
]
app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

@app.route('/all', methods=['GET'])
def all_sensor():
    sensor_all = []
    udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    for sensor in sensors:
        dest = (sensor['ip'], sensor['port'])
        udp.sendto (bytes('/GET', 'utf-8'), dest)
        msg, cliente = udp.recvfrom(1024)
        response = sensor_pb2.Sensor()
        response.ParseFromString(msg)

        sensor_all.append({'name': response.nome, 'status': response.status})
    return jsonify({'sensors': sensor_all})


@app.route('/sensor/get', methods=['POST'])
def sensor_get():
    content = request.get_json(silent = True)

    get_sensor = None

    for sensor in sensors:
        if(sensor['name'] == content['sensor']):
            get_sensor = sensor
            break

    udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    dest = (get_sensor['ip'], get_sensor['port'])
    udp.sendto (bytes('/GET', 'utf-8'), dest)
    msg, cliente = udp.recvfrom(1024)
    response = sensor_pb2.Sensor()
    response.ParseFromString(msg)

    return jsonify({'name': response.nome, 'status': response.status})

@app.route('/sensor/set', methods=['POST'])
def sensor_set():
    content = request.get_json(silent = True)

    get_sensor = None

    for sensor in sensors:
        if(sensor['name'] == content['sensor']):
            get_sensor = sensor
            break

    udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    dest = (get_sensor['ip'], get_sensor['port'])
    udp.sendto (bytes('/SET', 'utf-8'), dest)
    msg, cliente = udp.recvfrom(1024)
    response = sensor_pb2.Sensor()
    response.ParseFromString(msg)

    return jsonify({'name': response.nome, 'status': response.status})

if (__name__ == '__main__'):
    app.run(host='localhost', port=5000)