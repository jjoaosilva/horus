import socket
HOST = 'localhost'  # Endereco IP do Servidor
PORT = 5003           # Porta que o Servidor esta
udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
dest = (HOST, PORT)
print ('Para sair use CTRL+X\n')
msg = input()
while True:
    udp.sendto (bytes(msg, 'utf-8'), dest)
    msg, cliente = udp.recvfrom(1024)
    print(msg, cliente)
    msg = input()
udp.close()