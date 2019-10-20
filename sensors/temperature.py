import socket
import sensor_pb2
import random

def process(info):
    if(info == bytes('/SET', 'utf-8')):
        temperatura.status = str(random.randint(-10, 40))
        return True

    elif(info == bytes('/GET', 'utf-8')):
        temperatura.status = str(random.randint(-10, 40))
        return True

    elif(info == bytes('/INFO', 'utf-8')):
        temperatura.status = str(random.randint(-10, 40))
        return True

    else:
        return False

HOST = ''
PORT = 5002

udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
orig = (HOST, PORT)
udp.bind(orig)

temperatura = sensor_pb2.Sensor()
temperatura.nome = "Temperatura"
temperatura.status = '0'

while True:
    msg, cliente = udp.recvfrom(1024)
    print (cliente, msg)
    if(msg == bytes("DES", 'utf-8')):
        break

    if(process(msg)):
        udp.sendto (temperatura.SerializeToString(), cliente)
    else:
        udp.sendto (bytes('False', 'utf-8'), cliente)

udp.close()