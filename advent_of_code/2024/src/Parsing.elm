module Parsing exposing (parseMap)
import Dict exposing (Dict)

parseMap : String -> Dict (Int, Int) Char
parseMap input = String.trim input
            |> String.lines
            |> List.indexedMap (\y line ->
                String.toList line
                    |> List.indexedMap (\x char ->
                        ((x, y), char)
                    )
            )
            |> List.concat
            |> Dict.fromList
