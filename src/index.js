import "./styles.css"
import "./reminders.css"
import "./dialog.css"

import { display_driver} from "./displayDriver";

//storage
let projects = []

export { projects, calendar }
import { display_task, display_projects} from "./displayDriver";

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

    buildFromProjects(projects) {
        this._tasksByDate = {}; 
        projects.forEach(project => {
            project.tasks.forEach(task => {
                this.addTask(task);
            });
        });
    }

    getTasksByDate(dateStr) {
        return this._tasksByDate[dateStr] || [];
    }

    getDailyTasks(today = new Date()) {
        const todayKey = today.toISOString().split("T")[0];
        return this._tasksByDate[todayKey] || [];
    }

    getWeeklyTasks(date = new Date()){
        const tasks = [];

        const start = new Date(date);
        start.setDate(start.getDate() -  start.getDay());

        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const key = d.toISOString().split("T")[0];
            if (this._tasksByDate[key]) {
                tasks.push(...this._tasksByDate[key]);
            }
        }

        return tasks || [];
    }

    getOverdueTasks(today = new Date()) {
        const tasks = [];

        const todayKey = today.toISOString().split("T")[0];

        for (const dateKey in this._tasksByDate) {
            if (dateKey < todayKey) { 
                tasks.push(...this._tasksByDate[dateKey]);
            }
        }

        return tasks || [];
    }
}

function gather_task_data() {
    const form = document.querySelector(".task")
    const dialog = document.querySelector(".edit_add")

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop default submit
        const formData = new FormData(e.target); 

        const selectedRadio = document.querySelector('input[name="priority"]:checked');
        
        const task = new Task(
            formData.get('title'),
            formData.get('description'), 
            selectedRadio.value, 
            formData.get('date_task'), 
            formData.get("projects_dropdown")
            );
        

        let targetProject = projects.find(p => p.title === formData.get("projects_dropdown"));
        targetProject.addTask(task);
        calendar.buildFromProjects(projects);
        display_task(task)
        form.reset()
        dialog.close(); // closes the modal
    });
}

function gather_project_data() {
    const form = document.querySelector(".project_form")
    const dialog = document.querySelector(".create_project")

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop default submit
        const formData = new FormData(e.target); 
        
        const newProj = new Project(
            formData.get('title')
            );
        
        projects.push(newProj);
        calendar.buildFromProjects(projects);
        display_projects()
        form.reset()
        dialog.close(); // closes the modal
    });
}
//pre-populate projects
let calendar = new Calendar()

let project1 = new Project("Chores")
let project2 = new Project("Daily")
let task1 = new Task("A Simple Task", "Small task that I need to do.", "Low", "2025-09-25", project1.title)
let task2 = new Task("test task", "Small task that I need to do.", "Low", "2025-09-30", project1.title)
let task3 = new Task("good task", "Small task that I need to do.", "Low", "2025-10-01", project1.title)
let task4 = new Task("bad task", "Small task that I need to do.", "Low", "2025-09-20", project1.title)
let task5 = new Task("proj2 task", "Small task that I need to do. chat chat", "Low", "2025-10-04", project2.title)

project1.addTask(task1)
project1.addTask(task2)
project1.addTask(task3)
project1.addTask(task4)

project2.addTask(task5)

projects.push(project1)
projects.push(project2)
calendar.buildFromProjects(projects)

gather_task_data()
gather_project_data()
display_driver()