import deleteImg from "./assets/delete.png";
import editImg from "./assets/edit.png";

import { projects } from ".";

function task_button_driver() {
    document.querySelector("#all_tasks").addEventListener("focus", () => {
        display_all_tasks();
    });
}

function display_task(task) {
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
export const display_projects = () => {
    task_button_driver()
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

//displaying all tasks on board
export const display_all_tasks = () => {
    projects.forEach(project => {
        project.tasks.forEach(task => {
            display_task(task);
        });
    });
}