const {PageVisits}= require("../Model/Trace.model");

exports.trackSave = async(req, res,next) => {
    try {
        const {hashCode,body} = req.body;
        let pageVisit = new PageVisits({hashCode,body});
        pageVisit = await pageVisit.save();
        return res.send({text:"working",res:pageVisit})

    } catch (error) {
        return res.json({text:`Found Error`,error,status:400});
        
    }
}

/*

fl=202f40
h=www.cloudflare.com
ip=****
ts=1599578495.641
visit_scheme=https
uag=***
colo=BOM
http=http/2
loc=BD
tls=TLSv1.3
sni=plaintext
warp=off

fl=Cloudflare WebServer Instance
h=WebServer Hostname
ip=IP Address of client
ts=Epoch Time in seconds.millis (Similar to `date +%s.%3N` in bash)
visit_scheme=https or http
uag=User Agent
colo=IATA location identifier
sliver=Whether the request is splitted
http=HTTP Version
loc=Country Code
tls=TLS or SSL Version
sni=Whether SNI encrypted or plaintext
warp=Whether client over Cloudflares Wireguard VPN
gateway=Whether client over Cloudflare Gateway
kex=Key exchange method for TLS

https://cloudflare-quic.com/b/

*/
/*

fl=59f94
h=www.cloudflare.com
ip=2401:4900:1c01:7d39:41fb:7477:e4a7:761e
ts=1669708551.977
visit_scheme=https
uag=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36
colo=MAA
sliver=none
http=http/2
loc=IN
tls=TLSv1.3
sni=plaintext
warp=off
gateway=off
kex=X25519


fl=59f89
h=www.cloudflare.com
ip=2401:4900:1c01:7d39:8d79:ae1a:958d:e30b
ts=1669708480.595
visit_scheme=https
uag=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36
colo=MAA
sliver=none
http=http/2
loc=IN
tls=TLSv1.3
sni=plaintext
warp=off
gateway=off
kex=X25519


*/