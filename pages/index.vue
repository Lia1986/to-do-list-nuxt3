<template>
  <div class="main">
    <div class="block">
      <h2 class="title">Add task</h2>
      <input
        v-model="title"
        placeholder="Title"
        class="input-title"
        type="text"
        :style="{
          'margin-bottom': $v.title.$dirty && $v.title.$invalid ? '5px' : '',
        }"
      />
      <span
        class="error-message mb-20"
        v-if="$v.title.$invalid && $v.title.$dirty"
      >
        Title is required
      </span>
      <button @click="add" class="add-btn">Add</button>
    </div>
    <div class="block">
      <h2 class="title">List of tasks</h2>
      <div v-if="getTasks.length">
        <task
          v-for="item in getTasks"
          :listType="'in progress'"
          :key="item.id"
          :task="item"
        />
      </div>
      <p v-else class="warning-message">The list is empty!!!</p>
    </div>
    <div class="block">
      <h2 class="title">Completed tasks</h2>
      <div v-if="getCompletedTasks.length">
        <task
          v-for="item in getCompletedTasks"
          :key="item.id"
          :task="item"
          :listType="'completed'"
        />
      </div>
      <p v-else class="warning-message">The list is empty!!!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTasksStore } from "../stores/index";
import { required } from "vuelidate/lib/validators";
import { computed } from "vue";

const title = ref("");
const store = useTasksStore();

const $v = ref({
  title: {
    $model: title,
    $dirty: false,
    $invalid: false,
    $touch: () => {
      $v.value.title.$dirty = true;
      $v.value.title.$invalid = !required(title.value);
    },
    $reset: () => {
      $v.value.title.$dirty = false;
      $v.value.title.$invalid = false;
    },
  },
});

const add = () => {
  const titleValue = title.value;
  $v.value.title.$touch();


  if (!$v.value.title.$invalid) {
    const newTask = {
      status: "in progress",
      title: titleValue,
      id: new Date().getTime(),
    };
    store.addTask(newTask);
    title.value = "";
    $v.value.title.$reset();
  }
};

const getTasks = computed(() => store.getTasks);
const getCompletedTasks = computed(() => store.getCompletedTasks);
</script>
