# Overview

Este repositorio tiene la implementacion de la respuesta de la tarea en local, menos el punto 4

He decidido empezar el proyecto de 0 para despues implementar esos conceptos en la estructura dada. 

# El problema

1. El programa puede añadir y eliminar monedas de las que sacar el exchange price
2. Permite ver las monedas que se sacan actualmente
3. De forma periodica saca los datos exchange price de las monedas a Euros (EUR)
4. El usuario no puede sacar directamente los datos, están almacenados en la carpeta base de datos

# Tareas

- Están implementados los endpoints de [POST]/currency [DELETE]/currency [GET]/currency
- Los datos están almacenados, el endpoint sacaria los datos de la hora anterior y los contrastaria con los actuales para sacar los parametros diff 
- Está implementado la adquisición de datos de forma periódica (cada 1 minuto en vez de 1 hora para pruebas)

