<template>
  <div class="dashboard page">
    <div class="status-container">
      <div>
        <h5>AVAILABLE</h5>
        <p>Total: <span>4</span></p>
      </div>
      <table>
        <thead>
          <th>Name</th>
          <th>Title</th>
          <th>Date/Time</th>
          <th>Running Time</th>
        </thead>
      </table>
    </div>

    <div class="status-container">
      <div>
        <h5>EN ROUTE</h5>
        <p>Total: <span>2</span></p>
      </div>
      <table>
        <thead>
          <th>Name</th>
          <th>Title</th>
          <th>Date/Time</th>
          <th>Running Time</th>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
};
</script>

<style lang="scss">
.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
}

.status-container {
  background-color: $primary-black;
  height: fit-content;
  color: $bg-color;
  padding: 1em;
  border-radius: 5px;
  min-height: 500px;

  & > div {
    display: flex;
    justify-content: space-between;

    p {
      font-size: 0.8rem;
    }
  }

  table {
    width: 100%;
    margin-top: 2em;

    th {
      font-size: 0.8rem;
      border-bottom: solid 1px $bg-color;
    }
  }

  h5 {
    font-size: 1.1rem;
    letter-spacing: 2px;
  }
}
</style>
