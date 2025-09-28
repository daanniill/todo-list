import "./styles.css"
import "./reminders.css"

import { display_all_tasks, display_projects } from "./displayDriver";

//storage
let projects = []

export { projects }

//class prototypes
class Task {
    constructor(title, description, priority, date, category){
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._date = date;
        this._category = category;
    }

    get title() {
        return this._title;
    }

    get description(){
        return this._description;
    }

    get priority() {
        return this._priority;
    }

    get date() {
        return this._date;
    }

    get category() {
        return this._category;
    }

    setProject(project) {
        this._project = project;
    }
}

class Project {
    constructor(title){
        this._title = title;
        this._tasks = [];
    }

    get title() {
        return this._title;
    }

    get tasks() {
        return this._tasks;
    }

    addTask(task){
        if (task instanceof Task) {
            this._tasks.push(task);
            task.setProject(this._title)
        }
        else {
            throw new Error("Only Task instances can be added.");
        }
    }

    removeTask(taskTitle) {
        this._tasks = this._tasks.filter(task => task.title !== taskTitle);
    }

    getTask(taskTitle) {
        return this._tasks.find(task => task.title === taskTitle);
    }

    getAllTasks() {
        return this._tasks;
    }
}

//date manager
class Calendar {
    constructor() {
        this._tasksByDate = {};
    }

    addTask(task) {
        const dateKey = task.date;
        if (!this._tasksByDate[dateKey]) {
            this._tasksByDate[dateKey] = [];
        }
        this._tasksByDate[dateKey].push(task);
    }

    getTasksByDate(dateStr) {
        return this._tasksByDate[dateStr] || [];
    }
}

//pre-populate projects
let project1 = new Project("Chores")
let task1 = new Task("A Simple Task", "Small task that I need to do.", "Low", "09/12/2025", "")

project1.addTask(task1)
projects.push(project1)

display_projects()