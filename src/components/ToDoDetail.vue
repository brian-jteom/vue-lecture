<template>
    <v-container>
      <h2>To-Do Detail</h2>
      <v-card>
        <v-card-text>
          <p>ID: {{ id }}</p>
        </v-card-text>
      </v-card>
      <v-btn @click="$router.push('/')">Back</v-btn>
    </v-container>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    }
  }
  </script>