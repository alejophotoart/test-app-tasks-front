import { Injectable, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Task } from '../Interfaces/task'

const DB_USER='myuserdb'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db!: SQLiteDBConnection 

  private tasks:WritableSignal<Task[]> = signal<Task[]>([])

  constructor() { }

  async initializePlugin() {
    this.db = await this.sqlite.createConnection(
      DB_USER,
      false,
      'no-encryption',
      1,
      false,
    )

    await this.db.open()

    const schema = `CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description VARCHAR(255) NOT NULL,
      completed BOOLEAN,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`

    await this.db.execute(schema)
    this.loadTasks()
    return true
  }

  getTasks() {
    return this.tasks
  }
  
  async loadTasks() {
    try {
      const tasks = await this.db.query('SELECT * FROM tasks ORDER BY created_at DESC;')
      console.log("Tasks", tasks.values);
      this.tasks.set(tasks.values || [])

      return true
    } catch (error) {
      console.log(error);
      return false
    }

  }

  async addtask(task: Task) {
    try {
      const query = 'INSERT INTO tasks (name, description, completed) VALUES (?, ?, ?)'
      await this.db.query(query, [task.name, task.description, task.completed ? 1 : 0])
  
      this.loadTasks()  
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async showTaskById(id: number) {
    try {
      const query = 'SELECT * FROM tasks WHERE id = ?'
      const result = await this.db.query(query, [id])
  
      if (result.values && result.values.length > 0) {
        return result.values[0] as Task;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async updateTaskById(task: Task) {
    try {
      const query = 'UPDATE tasks SET name = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      await this.db.query(query, [task.name, task.description, task.completed ? 1 : 0, task.id])
  
      this.loadTasks()
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async deleteTaskById(id: number) {
    try {
      const query = 'DELETE FROM tasks WHERE id = ?'
      await this.db.query(query, [id])  

      this.loadTasks()
      return true      
    } catch (error) {
      console.log(error);
      return false
    }
  }
  // async loadTasks() {
  //   const tasks = await this.db.query('SELECT * FROM tasks')
  //   this.task.set(tasks.values || [])
  // }

  // async loadTasks() {
  //   const tasks = await this.db.query('SELECT * FROM tasks')
  //   this.task.set(tasks.values || [])
  // }
}
