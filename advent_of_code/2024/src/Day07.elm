module Day07 exposing (main)
import Html
import Puzzle07 exposing (input, puzzle_input)
import Dict exposing (Dict)
import Maybe

main = Html.text (solver Puzzle07.puzzle_input)

parser : String -> Int
parser input =
    let
        lines = input |> String.trim |> String.lines
        dict = List.map(\words -> String.split(": ") words) lines
            |> List.filterMap(\words -> case words of
                    x::xs -> Just (Maybe.withDefault 0 (String.toInt x), xs)
                    _ -> Nothing
               )
            |> List.map (\(h, t) -> (h, List.foldl (++) "" t
                        |> String.words
                        |> List.filterMap (\x -> String.toInt x)
                    )
                )
            |> List.filterMap(\(r, tail) ->
                let
                    combos = tail |> operatorCombos
                in
                    if (List.any (\result -> result == r) combos) then
                        Just (r)
                    else
                        Nothing
                )
    in
    List.sum dict

operatorCombos : List Int -> List Int
operatorCombos numbers =
    case numbers of
        first :: rest -> processRest [first] rest
        [] -> []

concat : Int -> Int -> Int
concat left right =
    String.fromInt left ++ String.fromInt right
    |> String.toInt
    |> Maybe.withDefault 0

processRest : List Int -> List Int -> List Int
processRest results remaining =
    case remaining of
        next :: rest ->
            let
                newResults =
                    List.concatMap (\current ->
                        [ current + next
                        , current * next
                        -- part 2
                        , concat current next
                        ]
                        ) results
            in
            processRest newResults rest
        [] -> results


solver : String -> String
solver input =
    let
        part1 = parser input
    in
    Debug.toString (part1)

