# To get pokemon cries, use this syntax:

curl:
```bash
curl -X GET -H 'Authorization: Bearer tH3x7Xmhiw7TdqI0vIRXfAiE6pXoCn8JHGssP71D0CTc0bGH66uNjUtx2iS1e6mk' -H 'Accept: audio/wav' -o /home/michael/VSCode/Code_Platoon/Personal_Project/pokepals_proj/static/cries/test.wav  https://api.pkmnapi.com/v1/pokemon/cries/1
```

JavaScript:
```js
import axios from 'axios'
import fs from 'fs'

axios.get('https://api.pkmnapi.com/v1/pokemon/cries/{pokemon_id}', {
 headers: {
   Authorization: 'Bearer tH3x7Xmhiw7TdqI0vIRXfAiE6pXoCn8JHGssP71D0CTc0bGH66uNjUtx2iS1e6mk',
   Accept: 'audio/wav'
 }
}).then((response) => {
  const output = '/home/michael/VSCode/Code_Platoon/Personal_Project/pokepals_proj/static/cries/cry_{pokemon_id}.wav'
  fs.writeFileSync(outputFilename, result.data)
  return output
})
```
** Test this first **
