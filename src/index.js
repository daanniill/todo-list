import deleteImg from "./assets/delete.png";
import editImg from "./assets/edit.png";

import "./styles.css"
import "./reminders.css"

//storage
let projects = []

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

//pre-populate projects
let project1 = new Project("Chores")
let task1 = new Task("A Simple Task", "Small task that I need to do.", "Low", "09/12/2025", "")

project1.addTask(task1)
projects.push(project1)

//showing projects on page
function display_projects() {
    const sidebar = document.querySelector(".projects");

    projects.forEach(project => {
        // main container
        const projDiv = document.createElement("div");
        projDiv.classList.add("proj_side");
        projDiv.setAttribute("tabindex", "0");

        // project title
        const heading = document.createElement("h4");
        heading.textContent = project.title;

        // control container
        const controlDiv = document.createElement("div");
        controlDiv.id = "control_side";

        // edit icon
        const editIcon = document.createElement("img");
        editIcon.id = "edit_icon";
        editIcon.src = editImg;

        // delete icon
        const deleteIcon = document.createElement("img");
        deleteIcon.id = "delete_icon";
        deleteIcon.src = deleteImg;

        // assemble
        controlDiv.appendChild(editIcon);
        controlDiv.appendChild(deleteIcon);

        projDiv.appendChild(heading);
        projDiv.appendChild(controlDiv);

        sidebar.append(projDiv)
    });
}

display_projects()
