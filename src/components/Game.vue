<template>
    <div>
      <img :src="currentImageSrc" alt="Game Image">
      <div class="buttons">
        <button @click="checkAnswer(true)">Vrai</button>
        <button @click="checkAnswer(false)">Faux</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          'plant.webp', // Remplacez par le chemin réel de vos images
          'plant.webp',
          // Ajoutez autant d'images que nécessaire
        ],
        currentImageIndex: 0
      };
    },
    computed: {
      currentImageSrc() {
        return `/assets/images/${this.images[this.currentImageIndex]}`;
      }
    },
    methods: {
      checkAnswer(answer) {
        // Ajoutez ici la logique pour vérifier la réponse (vrai ou faux)
        // Par exemple, affichez une alerte ou mettez à jour un score
        alert(answer ? 'Vrai !' : 'Faux !');
  
        // Passez à l'image suivante
        this.moveToNextImage();
      },
      moveToNextImage() {
        // Passez à l'image suivante (boucle à la première image si nécessaire)
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }
    }
  };
  </script>
  
  <style scoped>
  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    margin: 0 10px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  