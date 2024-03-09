<template>
  <div id="calendar-container">
    <div>{{ presentDays }}</div>
    <div>{{ pastDays }}</div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      presentDays: "Ankehitriny",
      pastDays: "Taloha",
    };
  },

  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
