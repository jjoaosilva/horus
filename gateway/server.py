# import socket
# HOST = ''              # Endereco IP do Servidor
# PORT = 5000            # Porta que o Servidor esta

# sensoresAtivos = [
#     {name: 'Cafeteira'  , ip: 'localhost', port: 5001},
#     {name: 'Temperatura', ip: 'localhost', port: 5002},
#     {name: 'Lampada'    , ip: 'localhost', port: 5003},
# ]

# def process(info):

# udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# orig = (HOST, PORT)
# udp.bind(orig)
# while True:
#     msg, cliente = udp.recvfrom(1024)
#     print (cliente, msg)
#     if(msg == bytes("DES", 'utf-8')):
#         break

#     process(msg)
# udp.close()