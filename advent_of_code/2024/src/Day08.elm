module Day08 exposing (main)
import Puzzle08 exposing (input, puzzle_input)
import Dict exposing (Dict)
import Html
import Parsing
import Set exposing (Set)

main = Html.text (solver puzzle_input)
parser input =
    let
        map = Parsing.parseMap input
        locations = Dict.foldl (\coords t s -> case t of
            '.' -> s
            other ->
                Dict.update other
                    (\maybeCoords ->
                        case maybeCoords of
                            Just value -> Just (coords :: value)
                            Nothing -> Just [coords]
                    )
                    s
            )
            Dict.empty
            map
    in
    (map, locations)

createPairs : List (Int, Int) -> List ((Int, Int), (Int, Int))
createPairs coords =
    List.concatMap
        (\coord1 ->
            List.filterMap
                (\coord2 ->
                    if coord1 /= coord2 then
                        Just (coord1, coord2)
                    else
                        Nothing
                )
                coords
        )
        coords

getDistance : (Int, Int) -> (Int, Int) -> (Int, Int)
getDistance (x1, y1) (x2, y2) =
    (x2 - x1, y2 - y1)

createExtendedPoints : Set (Int, Int) -> (Int, Int) -> (Int, Int) -> List (Int, Int)
createExtendedPoints availableCoords p1 p2 =
    let
        (dx, dy) = getDistance p1 p2

        -- Helper to keep extending in one direction
        extendDirection : (Int, Int) -> List (Int, Int)
        extendDirection (x, y) =
            let
                nextPoint = (x + dx, y + dy)
            in
            if Set.member nextPoint availableCoords then
                nextPoint :: extendDirection nextPoint
            else
                []

        -- Get points in both directions
        beforePoints = extendDirection p1
        afterPoints = extendDirection p2
    in
    beforePoints ++ afterPoints

solver input =
    let
        (map, locations) = parser (input)
        availableCoords = Dict.keys map |> Set.fromList
        antinodes = Dict.map (\_ positions -> createPairs positions) locations
                |> Dict.values
                |> List.map (\pairs ->
                    let
                        placeableAntinodes = List.map (\((x, y), (x1, y1)) ->
                            createExtendedPoints availableCoords (x, y) (x1, y1)) pairs
                            |> Set.fromList
                            |> Set.toList
                    in
                    placeableAntinodes
                    )
                |> List.concatMap identity
                |> List.concatMap identity
                |> Set.fromList
                |> Set.size
    in
    antinodes
    |> Debug.toString
