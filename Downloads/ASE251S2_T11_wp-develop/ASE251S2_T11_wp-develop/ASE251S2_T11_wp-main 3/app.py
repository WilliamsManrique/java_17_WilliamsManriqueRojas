from flask import Flask, render_template, request, redirect, url_for, jsonify
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/productos")
def productos():
    return render_template("productos.html")

@app.route("/servicio")
def servicio():
    return render_template("servicio.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/nosotros")
def nosotros():
    return render_template("nosotros.html")

@app.route('/formulario_compra')
def formulario_compra():
    return render_template('formulario_compra.html')

#ejecutar mi servidor
if __name__ == '__main__':
    app.run(debug=True)