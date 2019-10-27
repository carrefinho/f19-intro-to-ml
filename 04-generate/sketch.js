let input, submit, result;

const rnn = ml5.charRNN("models/dt01/", () => {
    console.log('model loaded');

    input = document.querySelector('input');
    submit = document.querySelector('#submit');
    submit.addEventListener('click', () => {
        generateText();
    })
    result = document.querySelector('#result');
})

const generateText = () => {

    let seed = input.value;
    console.log(seed)

    const options = {
        seed: seed,
        length: 200,
        temperature: 0.75
    }

    rnn.generate(options, (err, results) => {
        console.log(results);
        result.innerHTML = seed + ' ' + results.sample;
    })
}