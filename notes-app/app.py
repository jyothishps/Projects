from flask import Flask, render_template, request, redirect, flash
import sqlite3

app = Flask(__name__)
app.secret_key = "your_secret_key_here"  # Needed for flash messages

# Create table & upgrade DB if needed
def init_db():
    conn = sqlite3.connect("notes.db")
    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT
        )
    """)

    # Add created_at if missing
    try:
        c.execute("ALTER TABLE notes ADD COLUMN created_at TEXT")
    except:
        pass

    # Fill missing timestamps
    c.execute("UPDATE notes SET created_at = datetime('now') WHERE created_at IS NULL")

    conn.commit()
    conn.close()

init_db()


@app.route("/")
def home():
    conn = sqlite3.connect("notes.db")
    c = conn.cursor()
    c.execute("SELECT id, title, content, created_at FROM notes ORDER BY id DESC")
    notes = c.fetchall()
    conn.close()

    return render_template("home.html", notes=notes)


@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        title = request.form["title"]
        content = request.form["content"]

        conn = sqlite3.connect("notes.db")
        c = conn.cursor()
        c.execute("INSERT INTO notes (title, content, created_at) VALUES (?, ?, datetime('now'))",
                  (title, content))
        conn.commit()
        conn.close()

        flash("Note added successfully!", "success")
        return redirect("/")

    return render_template("add.html")


@app.route("/delete/<int:id>")
def delete(id):
    conn = sqlite3.connect("notes.db")
    c = conn.cursor()
    c.execute("DELETE FROM notes WHERE id = ?", (id,))
    conn.commit()
    conn.close()

    flash("Note deleted!", "info")
    return redirect("/")


@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit(id):
    conn = sqlite3.connect("notes.db")
    cur = conn.cursor()

    if request.method == "POST":
        title = request.form["title"]
        content = request.form["content"]

        cur.execute("UPDATE notes SET title=?, content=? WHERE id=?", (title, content, id))
        conn.commit()
        conn.close()

        flash("Note updated successfully!", "success")
        return redirect("/")

    cur.execute("SELECT * FROM notes WHERE id=?", (id,))
    note = cur.fetchone()
    conn.close()

    return render_template("edit.html", note=note)


app.run(debug=True)
