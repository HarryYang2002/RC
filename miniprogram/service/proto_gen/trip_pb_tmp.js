// Common aliases
const $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const server = $root.server = (() => {

    /**
     * Namespace server.
     * @exports server
     * @namespace
     */
    const server = {};

    server.Location = (function() {

        /**
         * Properties of a Location.
         * @memberof server
         * @interface ILocation
         * @property {number|null} [latitude] Location latitude
         * @property {number|null} [longitude] Location longitude
         */

        /**
         * Constructs a new Location.
         * @memberof server
         * @classdesc Represents a Location.
         * @implements ILocation
         * @constructor
         * @param {server.ILocation=} [properties] Properties to set
         */
        function Location(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Location latitude.
         * @member {number} latitude
         * @memberof server.Location
         * @instance
         */
        Location.prototype.latitude = 0;

        /**
         * Location longitude.
         * @member {number} longitude
         * @memberof server.Location
         * @instance
         */
        Location.prototype.longitude = 0;

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof server.Location
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {server.Location} Location
         */
        Location.fromObject = function fromObject(object) {
            if (object instanceof $root.server.Location)
                return object;
            let message = new $root.server.Location();
            if (object.latitude != null)
                message.latitude = Number(object.latitude);
            if (object.longitude != null)
                message.longitude = Number(object.longitude);
            return message;
        };

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @function toObject
         * @memberof server.Location
         * @static
         * @param {server.Location} message Location
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Location.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.latitude = 0;
                object.longitude = 0;
            }
            if (message.latitude != null && message.hasOwnProperty("latitude"))
                object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
            if (message.longitude != null && message.hasOwnProperty("longitude"))
                object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
            return object;
        };

        /**
         * Converts this Location to JSON.
         * @function toJSON
         * @memberof server.Location
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Location.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Location;
    })();

    /**
     * TripStatus enum.
     * @name server.TripStatus
     * @enum {number}
     * @property {number} TS_NOT_SPECIFIED=0 TS_NOT_SPECIFIED value
     * @property {number} NOT_STARTED=1 NOT_STARTED value
     * @property {number} IN_PROGRESS=2 IN_PROGRESS value
     * @property {number} FINISHED=3 FINISHED value
     * @property {number} PAID=4 PAID value
     */
    server.TripStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "TS_NOT_SPECIFIED"] = 0;
        values[valuesById[1] = "NOT_STARTED"] = 1;
        values[valuesById[2] = "IN_PROGRESS"] = 2;
        values[valuesById[3] = "FINISHED"] = 3;
        values[valuesById[4] = "PAID"] = 4;
        return values;
    })();

    server.Trip = (function() {

        /**
         * Properties of a Trip.
         * @memberof server
         * @interface ITrip
         * @property {string|null} [start] Trip start
         * @property {server.ILocation|null} [startPos] Trip startPos
         * @property {string|null} [end] Trip end
         * @property {number|null} [durationSec] Trip durationSec
         * @property {number|null} [feeCent] Trip feeCent
         * @property {server.ILocation|null} [endPos] Trip endPos
         * @property {Array.<server.ILocation>|null} [pathLocations] Trip pathLocations
         * @property {server.TripStatus|null} [status] Trip status
         */

        /**
         * Constructs a new Trip.
         * @memberof server
         * @classdesc Represents a Trip.
         * @implements ITrip
         * @constructor
         * @param {server.ITrip=} [properties] Properties to set
         */
        function Trip(properties) {
            this.pathLocations = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Trip start.
         * @member {string} start
         * @memberof server.Trip
         * @instance
         */
        Trip.prototype.start = "";

        /**
         * Trip startPos.
         * @member {server.ILocation|null|undefined} startPos
         * @memberof server.Trip
         * @instance
         */
        Trip.prototype.startPos = null;

        /**
         * Trip end.
         * @member {string} end
         * @memberof server.Trip
         * @instance
         */
        Trip.prototype.end = "";

        /**
         * Trip durationSec.
         * @member {number} durationSec
         * @memberof server.Trip
         * @instance
         */
        Trip.prototype.durationSec = 0;

        /**
         * Trip feeCent.
         * @member {number} feeCent
         * @memberof server.Trip
         * @instance
         */
        Trip.prototype.feeCent = 0;

        /**
         * Trip endPos.
         * @member {server.ILocation|null|undefined} endPos
         * @memberof server.Trip
         * @instance
         */
        Trip.prototype.endPos = null;

        /**
         * Trip pathLocations.
         * @member {Array.<server.ILocation>} pathLocations
         * @memberof server.Trip
         * @instance
         */
        Trip.prototype.pathLocations = $util.emptyArray;

        /**
         * Trip status.
         * @member {server.TripStatus} status
         * @memberof server.Trip
         * @instance
         */
        Trip.prototype.status = 0;

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof server.Trip
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {server.Trip} Trip
         */
        Trip.fromObject = function fromObject(object) {
            if (object instanceof $root.server.Trip)
                return object;
            let message = new $root.server.Trip();
            if (object.start != null)
                message.start = String(object.start);
            if (object.startPos != null) {
                if (typeof object.startPos !== "object")
                    throw TypeError(".server.Trip.startPos: object expected");
                message.startPos = $root.server.Location.fromObject(object.startPos);
            }
            if (object.end != null)
                message.end = String(object.end);
            if (object.durationSec != null)
                message.durationSec = object.durationSec | 0;
            if (object.feeCent != null)
                message.feeCent = object.feeCent | 0;
            if (object.endPos != null) {
                if (typeof object.endPos !== "object")
                    throw TypeError(".server.Trip.endPos: object expected");
                message.endPos = $root.server.Location.fromObject(object.endPos);
            }
            if (object.pathLocations) {
                if (!Array.isArray(object.pathLocations))
                    throw TypeError(".server.Trip.pathLocations: array expected");
                message.pathLocations = [];
                for (let i = 0; i < object.pathLocations.length; ++i) {
                    if (typeof object.pathLocations[i] !== "object")
                        throw TypeError(".server.Trip.pathLocations: object expected");
                    message.pathLocations[i] = $root.server.Location.fromObject(object.pathLocations[i]);
                }
            }
            switch (object.status) {
            case "TS_NOT_SPECIFIED":
            case 0:
                message.status = 0;
                break;
            case "NOT_STARTED":
            case 1:
                message.status = 1;
                break;
            case "IN_PROGRESS":
            case 2:
                message.status = 2;
                break;
            case "FINISHED":
            case 3:
                message.status = 3;
                break;
            case "PAID":
            case 4:
                message.status = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @function toObject
         * @memberof server.Trip
         * @static
         * @param {server.Trip} message Trip
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Trip.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.pathLocations = [];
            if (options.defaults) {
                object.start = "";
                object.end = "";
                object.durationSec = 0;
                object.feeCent = 0;
                object.startPos = null;
                object.endPos = null;
                object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
            }
            if (message.start != null && message.hasOwnProperty("start"))
                object.start = message.start;
            if (message.end != null && message.hasOwnProperty("end"))
                object.end = message.end;
            if (message.durationSec != null && message.hasOwnProperty("durationSec"))
                object.durationSec = message.durationSec;
            if (message.feeCent != null && message.hasOwnProperty("feeCent"))
                object.feeCent = message.feeCent;
            if (message.startPos != null && message.hasOwnProperty("startPos"))
                object.startPos = $root.server.Location.toObject(message.startPos, options);
            if (message.endPos != null && message.hasOwnProperty("endPos"))
                object.endPos = $root.server.Location.toObject(message.endPos, options);
            if (message.pathLocations && message.pathLocations.length) {
                object.pathLocations = [];
                for (let j = 0; j < message.pathLocations.length; ++j)
                    object.pathLocations[j] = $root.server.Location.toObject(message.pathLocations[j], options);
            }
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.server.TripStatus[message.status] : message.status;
            return object;
        };

        /**
         * Converts this Trip to JSON.
         * @function toJSON
         * @memberof server.Trip
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Trip.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Trip;
    })();

    server.GetTripRequest = (function() {

        /**
         * Properties of a GetTripRequest.
         * @memberof server
         * @interface IGetTripRequest
         * @property {string|null} [id] GetTripRequest id
         */

        /**
         * Constructs a new GetTripRequest.
         * @memberof server
         * @classdesc Represents a GetTripRequest.
         * @implements IGetTripRequest
         * @constructor
         * @param {server.IGetTripRequest=} [properties] Properties to set
         */
        function GetTripRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetTripRequest id.
         * @member {string} id
         * @memberof server.GetTripRequest
         * @instance
         */
        GetTripRequest.prototype.id = "";

        /**
         * Creates a GetTripRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof server.GetTripRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {server.GetTripRequest} GetTripRequest
         */
        GetTripRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.server.GetTripRequest)
                return object;
            let message = new $root.server.GetTripRequest();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a GetTripRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof server.GetTripRequest
         * @static
         * @param {server.GetTripRequest} message GetTripRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetTripRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.id = "";
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this GetTripRequest to JSON.
         * @function toJSON
         * @memberof server.GetTripRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetTripRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetTripRequest;
    })();

    server.GetTripResponse = (function() {

        /**
         * Properties of a GetTripResponse.
         * @memberof server
         * @interface IGetTripResponse
         * @property {string|null} [id] GetTripResponse id
         * @property {server.ITrip|null} [trip] GetTripResponse trip
         */

        /**
         * Constructs a new GetTripResponse.
         * @memberof server
         * @classdesc Represents a GetTripResponse.
         * @implements IGetTripResponse
         * @constructor
         * @param {server.IGetTripResponse=} [properties] Properties to set
         */
        function GetTripResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetTripResponse id.
         * @member {string} id
         * @memberof server.GetTripResponse
         * @instance
         */
        GetTripResponse.prototype.id = "";

        /**
         * GetTripResponse trip.
         * @member {server.ITrip|null|undefined} trip
         * @memberof server.GetTripResponse
         * @instance
         */
        GetTripResponse.prototype.trip = null;

        /**
         * Creates a GetTripResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof server.GetTripResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {server.GetTripResponse} GetTripResponse
         */
        GetTripResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.server.GetTripResponse)
                return object;
            let message = new $root.server.GetTripResponse();
            if (object.id != null)
                message.id = String(object.id);
            if (object.trip != null) {
                if (typeof object.trip !== "object")
                    throw TypeError(".server.GetTripResponse.trip: object expected");
                message.trip = $root.server.Trip.fromObject(object.trip);
            }
            return message;
        };

        /**
         * Creates a plain object from a GetTripResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof server.GetTripResponse
         * @static
         * @param {server.GetTripResponse} message GetTripResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetTripResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.trip = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.trip != null && message.hasOwnProperty("trip"))
                object.trip = $root.server.Trip.toObject(message.trip, options);
            return object;
        };

        /**
         * Converts this GetTripResponse to JSON.
         * @function toJSON
         * @memberof server.GetTripResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetTripResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetTripResponse;
    })();

    server.TripService = (function() {

        /**
         * Constructs a new TripService service.
         * @memberof server
         * @classdesc Represents a TripService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function TripService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (TripService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TripService;

        /**
         * Callback as used by {@link server.TripService#getTrip}.
         * @memberof server.TripService
         * @typedef GetTripCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {server.GetTripResponse} [response] GetTripResponse
         */

        /**
         * Calls GetTrip.
         * @function getTrip
         * @memberof server.TripService
         * @instance
         * @param {server.IGetTripRequest} request GetTripRequest message or plain object
         * @param {server.TripService.GetTripCallback} callback Node-style callback called with the error, if any, and GetTripResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(TripService.prototype.getTrip = function getTrip(request, callback) {
            return this.rpcCall(getTrip, $root.server.GetTripRequest, $root.server.GetTripResponse, request, callback);
        }, "name", { value: "GetTrip" });

        /**
         * Calls GetTrip.
         * @function getTrip
         * @memberof server.TripService
         * @instance
         * @param {server.IGetTripRequest} request GetTripRequest message or plain object
         * @returns {Promise<server.GetTripResponse>} Promise
         * @variation 2
         */

        return TripService;
    })();

    return server;
})();