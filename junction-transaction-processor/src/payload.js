class Junction_Payload {
    constructor (action, id, latitude, longitude, orientation, metadata) {
        this.action = action
        this.id = id
        this.latitude=latitude
        this.longitude=longitude
        this.orientation = orientation
        this.metadata = metadata
    }
    static fromBytes (payload) {
        if (payload==null)
            return(1);
        payload = payload.toString().split(',')
        if (payload.length === 6) {
            let Junc_Payload = new Junction_Payload(payload[0], payload[1], payload[2],payload[3], payload[4], payload[5])
            if (!Junc_Payload.id) {
                throw new InvalidTransaction('id is required')
            }
            if (!Junc_Payload.latitude) {
                throw new InvalidTransaction('latitude is required')
            }
            if (!Junc_Payload.longitude) {
                throw new InvalidTransaction('longitude is required')
            }
            if (!Junc_Payload.orientation) {
                throw new InvalidTransaction('orientation is required')
            }
            if (!Junc_Payload.metadata) {
                throw new InvalidTransaction('metadata is required')
            }

            if (!Junc_Payload.action) {
                throw new InvalidTransaction('Action is required')
            }
            return Junc_Payload
        } else {
        throw new InvalidTransaction('Invalid payload serialization')
        }
    }
}
