
import { parse } from "./parser/parse"
import { ntoa }  from "../misc"


const declaration = {

   limits: {
      degree: { min: 2, max: 2 },
      greatestValue: { max: 30 }
   },
   hands: () => ["Left", "Right"],
   parse: (string) => parse("compressed_sync", string),
   unparse

}

function unparse(throws) {

   return throws.map((action) => {
      const result = action.map((release) => {
         const string = release.map(({ value, from, to }) => {
            value *= 2
            return `${(value > 9 ? ntoa(value) : value)}${from === to ? "" : "x"}`
         }).join("")
         return release.length > 1 ? `[${string}]` : string
      })
      return `(${result})`
   }).join("")

}


export { declaration }
