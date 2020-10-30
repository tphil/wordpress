var wpbfp = '${settings.wp_protect}' == 'true' ? "THROTTLE" : "OFF";

var resp = {
  result: 0,
  ssl: !!jelastic.billing.account.GetQuotas('environment.jelasticssl.enabled').array[0].value,
  nodes: []
}

if (${settings.ls-addon:false}) {
  resp.nodes.push({
    nodeType: "llsmp",
    count: 1,
    flexibleCloudlets: ${settings.flexibleCloudlets:16},
    fixedCloudlets: ${settings.fixedCloudlets:1},
    diskLimit: ${settings.diskLimit:10},
    nodeGroup: "cp",
    displayName: "AppServer",
    env: {
      SERVER_WEBROOT: "/var/www/webroot/ROOT",
      REDIS_ENABLED: "true",
      WAF: "${settings.waf}",
      WP_PROTECT: wpbfp,
      WP_PROTECT_LIMIT: 100
    }
  })
}

if (!${settings.ls-addon:false}) {
  resp.nodes.push({
    nodeType: "lemp",
    count: 1,
    flexibleCloudlets: ${settings.flexibleCloudlets:16},
    fixedCloudlets: ${settings.fixedCloudlets:1},
    diskLimit: ${settings.diskLimit:10},
    nodeGroup: "cp",
    displayName: "AppServer",
    env: {
      SERVER_WEBROOT: "/var/www/webroot/ROOT",
      REDIS_ENABLED: "true"
    }
  })
}

return resp;
