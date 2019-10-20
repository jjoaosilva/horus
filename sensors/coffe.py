import socket
import sensor_pb2


def process(info):
    if(info == bytes('/SET', 'utf-8')):
        if(cafeteira.status == "Desligada"):
            cafeteira.status = "Ligada"
        else:
            cafeteira.status = "Desligada"
        return True

    elif(info == bytes('/GET', 'utf-8')):
        return True

    elif(info == bytes('/INFO', 'utf-8')):
        return True

    else:
        return False

HOST = ''
PORT = 5001

udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
orig = (HOST, PORT)
udp.bind(orig)

cafeteira = sensor_pb2.Sensor()
cafeteira.nome = "Cafeteira"
cafeteira.status = "Desligada"

while True:
    msg, cliente = udp.recvfrom(1024)
    print (cliente, msg)
    if(msg == bytes("DES", 'utf-8')):
        break

    if(process(msg) == True):
        udp.sendto (cafeteira.SerializeToString(), cliente)
    else:
        udp.sendto (bytes('False', 'utf-8'), cliente)

udp.close()