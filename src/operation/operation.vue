<template>
  <div class="container mt-5">
    <form class="mb-3" @submit.prevent="save">
      <div class="row g-1">
        <div class="col">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              id="date"
              type="date"
              placeholder="Date"
              required
              v-model="operation.date"
            />
            <label for="date" class="form-label">Date</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              id="time"
              type="time"
              placeholder="Time"
              required
              v-model="operation.time"
            />
            <label for="time" class="form-label">Time</label>
          </div>
        </div>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="type" required>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
          <option value="Transfer">Transfer</option>
        </select>
        <label for="type" class="form-label">Type</label>
      </div>
      <div class="form-floating mb-3">
        <input
          class="form-control"
          id="group"
          list="groups"
          placeholder="Group"
          required
          v-model="operation.group"
          @change="groupChanged"
        />
        <label for="group" class="form-label">Group</label>
        <datalist id="groups">
          <option
            :key="group"
            :value="group"
            v-for="group of Object.keys(groupsAndCategories)"
          />
        </datalist>
      </div>
      <div class="form-floating mb-3">
        <input
          class="form-control"
          :disabled="operation.group === ''"
          id="category"
          list="categories"
          placeholder="Category"
          required
          v-model="operation.category"
        />
        <label for="category" class="form-label">Category</label>
        <datalist id="categories">
          <option
            :key="category"
            :value="category"
            v-for="category of groupsAndCategories[operation.group]"
          />
        </datalist>
      </div>
      <div class="row g-1">
        <div class="col">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              id="unitCount"
              min="1"
              placeholder="Count"
              required
              type="number"
              v-model="operation.unitCount"
            />
            <label for="unitCount" class="form-label">Count</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating mb-3">
            <input
              class="form-control"
              id="amountPerUnit"
              min="1"
              placeholder="Amount"
              required
              type="number"
              v-model="operation.amountPerUnit"
            />
            <label for="amountPerUnit" class="form-label">Amount</label>
          </div>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input
          class="form-control"
          id="amount"
          min="0"
          placeholder="Total"
          readonly
          type="number"
          :value="(operation.unitCount * operation.amountPerUnit) / 100"
        />
        <label for="amount" class="form-label">Total</label>
      </div>
      <div class="form-floating mb-3">
        <textarea
          class="form-control"
          id="comments"
          placeholder="Comments"
        ></textarea>
        <label for="comments">Comments</label>
      </div>
      <button type="submit" class="btn btn-outline-primary">Save</button>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

import { getCurrentDateAndTimeAsStrings } from "./functions/getCurrentDateAndTimeAsStrings";
import { loadGroupsAndCategories } from "./functions/load-groups-and-categories";

export default {
  props: ["id"],

  setup: (props) => {
    let operation;
    let path;

    if (props.id === "new") {
      const { date, month, time, year } = getCurrentDateAndTimeAsStrings();

      operation = reactive({
        amountPerUnit: 1,
        date,
        selectedCategory: "",
        selectedGroup: "",
        time,
        unitCount: "",
      });

      path = `${year}/${month}`;
    } else {
      operation = localStorage.getItem(props.id);

      if (operation === null) {
        alert("Operation not found!");

        return {};
      }

      operation = JSON.parse(operation);

      const { timestamp } = operation;

      const { date, month, time, year } = getCurrentDateAndTimeAsStrings({
        timestamp,
      });

      operation.date = date;
      operation.time = time;

      path = `${year}/${month}`;
    }

    const groupChanged = ({ target: { value } }) => {
      if (value === "") {
        operation.selectedCategory = "";
      }
    };

    const save = () => {
      console.log(operation);
    };

    const groupsAndCategories = ref({});

    loadGroupsAndCategories({ groupsAndCategories });

    return {
      groupChanged,
      groupsAndCategories,
      operation,
      save,
    };
  },
};
</script>
