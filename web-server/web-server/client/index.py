import socket

server = ('192.168.5.110', 8088)
file = '/test.html'

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(server)
    s.sendall(file.encode())

    data = s.recv(1024)
    print(data.decode())