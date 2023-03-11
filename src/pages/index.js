import React from "react";

const wait = () => new Promise((resolve) => setTimeout(() => resolve(), 1000));

// WORKS
async function* gen1() {
  try {
    let i = 0;
    while (i < 4) {
      i++;
      await wait();

      console.log("yield");

      yield Math.random();
    }
  } finally {
    console.log("finally");
  }
}
//

// Does not work. Runs finally block after each iteration and also runs that same block once more at the end
async function* gen2() {
  let i = 0;
  try {
    while (i < 4) {
      i++;
      await wait();

      console.log("yield");

      yield Math.random();
    }
  } finally {
    console.log("finally");
  }
}
//
// Does not work. Runs finally block after each iteration
async function* gen3() {
  try {
    while (true) {
      await wait();

      const num = Math.random();

      if (num > 0.7) {
        console.log("break", num);
        break;
      }

      console.log("yield");

      yield num;
    }
  } finally {
    console.log("finally");
  }
}

(async () => {
  for await (const _num of gen2()) {
    console.log("iteration");
  }
})();

export default function Home() {
  return <></>;
}
