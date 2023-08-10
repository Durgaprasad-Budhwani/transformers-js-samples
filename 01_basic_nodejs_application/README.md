

## Convert any existing transformers model into transformers.js model

### 1. Download/Clone the repo

```bash
git clone git@github.com:xenova/transformers.js.git
```

### 2. Navigate to the repo

```bash
cd transformers.js
```


### 3. Convert the model

```bash
python3 -m scripts.convert --quantize --model_id MBZUAI/LaMini-Neo-125M
```

-----

## Run the model

### 1. Install the dependencies

```bash
yarn install
```

### 2. Run the model

```bash
node index.js
```
