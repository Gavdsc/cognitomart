import { proxyMap } from "valtio/utils";

/**
 * A replacer to handle serialising Map objects.
 * @param _ - Key
 * @param value - Value
 * @constructor
 */
export const MapReplacer = (_: any, value: any) => {
    if (!(value instanceof Map))
        return value;

    return {
        dataType: 'Map',
        value: [...value]
    };
}

/**
 * A reviver to handle reviving serialised Map objects.
 * @param _ - Key
 * @param value - Value
 * @constructor
 */
export const ProxyMapReviver = (_: any, value: any) => {
    if (!value || value.dataType !== 'Map')
        return value;

    return proxyMap(value.value);
};