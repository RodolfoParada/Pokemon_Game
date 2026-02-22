<template>
  <div class="skeleton-container fade-in">
    <div class="skeleton-image pulse"></div>
    
    <div class="skeleton-text pulse"></div>

    <div class="skeleton-options">
      <div v-for="i in 4" :key="i" class="skeleton-button pulse"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.skeleton-image {
  width: 200px;
  height: 200px;
  background: linear-gradient(
    #e0e0e0 45%, 
    #bdbdbd 45%, 
    #bdbdbd 55%, 
    #e0e0e0 55%
  );
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #bdbdbd;
}
.skeleton-text {
  width: 250px;
  height: 30px;
  background-color: #e0e0e0;
  margin-bottom: 40px;
  border-radius: 4px;
}

.skeleton-button {
  width: 250px;
  height: 45px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 5px;
}

/* Animación de pulso */
.pulse {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>