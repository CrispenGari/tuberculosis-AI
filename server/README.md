### Using cURL

The following commands can be used to test the API using `cURL`.

```shell
# normal
cURL -X POST -F xray=@normal.png http://127.0.0.1:8000/api/v1/tb/predict/mobilenetv3

# tb
cURL -X POST -F xray=@tb.png http://127.0.0.1:8000/api/v1/tb/predict/mobilenetv3
```

### Expected Response

The following is the API expected response.

```json
{
  "time": 0.3037984371185303,
  "ok": true,
  "status": "ok",
  "prediction": {
    "label": 1,
    "class_label": "Tuberculosis",
    "probability": 1.0
  },
  "model": "densenet201"
}
```
