const config = {
    healthCheckPath: "/health",
    healthCheckResponse: "Up and running",
    idPrefixRegex: /^[a-z]*_$/,
    reqIdPrefix: "req_"
}

export {config};
