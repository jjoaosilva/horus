import socket
import sensor_pb2


def process(info):
    if(info == bytes('/SET', 'utf-8')):
        if(lampada.status == "Desligada"):
            lampada.status = "Ligada"
        else:
            lampada.status = "Desligada"
        return True

    elif(info == bytes('/GET', 'utf-8')):
        return True

    elif(info == bytes('/INFO', 'utf-8')):
        return True

    else:
        return False

HOST = ''
PORT = 5003

udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
orig = (HOST, PORT)
udp.bind(orig)

lampada = sensor_pb2.Sensor()
lampada.nome = "Cafeteira"
lampada.status = "Desligada"

while True:
    msg, cliente = udp.recvfrom(1024)
    print (cliente, msg)
    if(msg == bytes("DES", 'utf-8')):
        break

    if(process(msg)):
        udp.sendto (lampada.SerializeToString(), cliente)
    else:
        udp.sendto (bytes('False', 'utf-8'), cliente)

udp.close()