<!-- Contains code for an EventCard -->
<template>
  <BCard
  title="Event Card ig"
  img-src="https://picsum.photos/id/25/600/300"
  img-alt="Image"
  img-top
  tag="article"
  style="max-width: 20rem"
>
  <BCardText>
    Some quick example text to build on the card title and make up the bulk of the card's content.
  </BCardText>
  <BButton href="#" variant="primary">Go somewhere</BButton>
</BCard>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.event-card h1,
.event-card h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
