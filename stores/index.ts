import { defineStore } from 'pinia';
interface Task {
    id: number;
    status: string;
}


export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[],
        completedTasks: [] as Task[],
    }),
    getters: {
        getTasks: (state) => state.tasks,
        getCompletedTasks: (state) => state.completedTasks,
    },
    actions: {
        addTask(data: Task) {
            this.tasks.push(data);
        },
        addCompletedTask(data: Task) {
            const item = this.tasks.findIndex((obj) => obj.id === data.id);
            const i = this.completedTasks.findIndex((obj) => obj.id === data.id);
            if (item > -1 && i === -1) {
                data.status = "completed";
                this.completedTasks.push(data);
            }
        },
        removeTask(data: Task) {
            const item = this.tasks.findIndex((obj) => obj.id === data.id);
            const i = this.completedTasks.findIndex((obj) => obj.id === data.id);
            if (item > -1) {
                this.tasks.splice(item, 1);
                if (i > -1) {
                    this.completedTasks.splice(i, 1);
                }
            }
        },
    },
});