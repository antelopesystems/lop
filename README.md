
# Introduction

Tool to parse json logs to a fixed log standard display.

# Installation

```shell
npm i -g @antelope/lop
```

# Usage

```shell
kubectl logs pod/example | lop
```

# Examples


## Kubectl logs with follow
```shell
kubectl logs -f pod/example | lop
```

## Filter by appender (log name)
```shell
kubectl logs pod/example | lop --appender standard
```
or
```shell
kubectl logs pod/example | lop -a standard
```

## Filter by log level
```shell
kubectl logs pod/example | lop -l WARN # Will show WARN logs and above (ERROR)
```
or 
```shell
kubectl logs pod/example | lop --level WARN # Will show WARN logs and above (ERROR)
```
