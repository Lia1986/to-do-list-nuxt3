<template>
  <div class="task">
    <div class="task-header">
      <h3>{{ task.title }}</h3>
      <div>
        <button @click="completeTask" v-if="task.status !== 'completed'">
          <img src="@/assets/images/svg/complete.svg" alt="complete icon" />
        </button>
        <button @click="removeTask" v-if="listType !== 'completed'">
          <img src="@/assets/images/svg/trash.svg" alt="trash icon" />
        </button>
      </div>
    </div>
    <p class="status">Status: {{ task.status }}</p>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { useTasksStore } from "../stores/index";

interface Task {
  title: string;
  status: string;
  id: number;
}

const { task, listType } = defineProps<{ task: Task; listType: string }>();

const store = useTasksStore();

const removeTask = () => {
  store.removeTask(task);
};

const completeTask = () => {
  store.addCompletedTask(task);
};
</script>