# 11747-async-autorun
Repro of meteor issue [11747](https://github.com/meteor/meteor/issues/11747)

Shows how using async functions with autoruns has a problem that should be documented.

Run the repro:
```bash
git clone https://github.com/brucejo75/11747-async-autorun
cd 11747-async-autorun
meteor npm install
meteor
```

- In Browser navigate to http://localhost:3000
- In browser window bring up the console window so you can see console output
- click "Click Me" button
- You will only see `Reactive: data foo, count: 1` in the console window
- You will not see `Not Reactive: data foo, count: 1`

This is the relevant code:
```javascript
...
  // This autorun is not reactive
  self.autorun(async function() {
    let asyncData = await  asyncDataFunction();
    let count = self.counter.get();
    console.log(`Not Reactive: data ${asyncData}, count: ${count}`);
  });

  // This autorun is reactive
  self.autorun(async function() {
    let count = self.counter.get();
    let asyncData = await  asyncDataFunction();
    console.log(`Reactive: data ${asyncData}, count: ${count}`);
  });
...
```
