//storage
let projects = []

export {projects}

import { Project, Task} from ".";

// Saving projects
export const saveProjects = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
}

// Load projects from localstorage
export const loadProjects = () => {
    const stored = localStorage.getItem("projects");
    if (!stored) return []

    try {
        const parsed = JSON.parse(stored)
        return parsed.map(projData => {
            const project = new Project(projData._title);
            projData._tasks.forEach(taskData => {
                const task = new Task(
                    taskData._title,
                    taskData._description,
                    taskData._priority,
                    taskData._date,
                    taskData._category
                );
                project.addTask(task);
            });
            return project;
        });
    } catch (err) {
        console.error("Error loading projects:", err);
        return [];
    }
}

// --- Replace projects safely ---
export const setProjects = (newProjects) => {
    projects.length = 0;            // keep same reference
    projects.push(...newProjects);  // fill with new data
};