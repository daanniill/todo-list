import deleteImg from "./assets/delete.png";
import editImg from "./assets/edit.png";

import { projects, calendar } from ".";

function task_button_driver() {
    document.querySelector("#all_tasks").addEventListener("focus", () => {
        clear_board()
        display_all_tasks();
    });
    document.querySelector("#today_tasks").addEventListener("focus", () => {
        clear_board()
        display_today_tasks();
    });
    document.querySelector("#week_tasks").addEventListener("focus", () => {
        clear_board()
        display_weekly_tasks();
    });
    document.querySelector("#overdue_tasks").addEventListener("focus", () => {
        clear_board()
        display_overdue_tasks();
    });
}

function dialog_open() {
    const modal = document.querySelector("dialog")
    document.querySelector("#add_task").addEventListener("click", () => {
        modal.showModal()
        update_dropdown()
    });
    document.querySelector("#close").addEventListener("click", () => {
        modal.close()
    });

}

function update_dropdown() {
    const dropdown = document.getElementById("projects_dropdown");
    dropdown.innerHTML = ""; // clear existing options

    // Add a default placeholder option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select...";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    dropdown.appendChild(defaultOption);

    // Add each project from the projects array
    projects.forEach(project => {
        const option = document.createElement("option");
        option.value = project.title;
        option.textContent = project.title;
        dropdown.appendChild(option);
    });
}

function clear_board() {
    document.querySelector("#board").innerHTML = "";
}

export const display_task = (task) => {
    // main card
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("tabindex", "0");

    // left check section
    const checkContainer = document.createElement("div");
    const check = document.createElement("div");
    check.classList.add("check");
    checkContainer.appendChild(check);

    // description section
    const descDiv = document.createElement("div");
    descDiv.classList.add("description");

    const taskName = document.createElement("h1");
    taskName.id = "task_name";
    taskName.textContent = task.title;

    const taskDesc = document.createElement("h2");
    taskDesc.id = "task_description";
    taskDesc.textContent = task.description;

    descDiv.appendChild(taskName);
    descDiv.appendChild(taskDesc);

    // details section
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");

    const priority = document.createElement("span");
    priority.id = "priority";
    priority.textContent = task.priority;

    const date = document.createElement("span");
    date.id = "date";
    date.textContent = task.date;

    const category = document.createElement("span");
    category.id = "category";
    category.textContent = task.category;

    detailsDiv.appendChild(priority);
    detailsDiv.appendChild(date);
    detailsDiv.appendChild(category);

    // assemble the card
    card.appendChild(checkContainer);
    card.appendChild(descDiv);
    card.appendChild(detailsDiv);

    document.querySelector("#board").appendChild(card)
}

//showing projects on page
function display_projects() {
    task_button_driver()
    const sidebar = document.querySelector("#projects_container");

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

        projDiv.addEventListener("focus", () => {
            clear_board();
            const projectTitle = heading.textContent;
            display_project_tasks(projectTitle);
        });

        sidebar.append(projDiv)
    });
}

//displaying all tasks on board
function display_all_tasks(){
    projects.forEach(project => {
        project.tasks.forEach(task => {
            display_task(task);
        });
    });
}

//display daily tasks
function display_today_tasks() {
    const date = new Date()
    const curdate = date.toISOString().split('T')[0];
    calendar.getTasksByDate(curdate).forEach(task => {
        display_task(task);
    });
}

//display weekly tasks
function display_weekly_tasks() {
    let all = calendar.getWeeklyTasks()
    all.forEach(task => {
        display_task(task);
    })
}

function display_overdue_tasks() {
    let all = calendar.getOverdueTasks()
    all.forEach(task => {
        display_task(task);
    })
}

function display_project_tasks(project_title) {
    projects.forEach(project => {
        if (project.title === project_title){
            project.tasks.forEach(task => {
                display_task(task);
            });
        };
    });
    
}

//driver activate
export const display_driver = () => {
    dialog_open()
    display_all_tasks()
    display_projects()
    task_button_driver()
}