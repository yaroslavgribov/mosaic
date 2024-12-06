module Day05 exposing (main)
import Html
import Puzzle05 exposing (input, puzzle_input)
import Dict exposing (Dict)
import Set exposing (Set)
main = Html.text (solver puzzle_input)

parser : List String -> (Connections, List String)
parser input =
    let
        (pages, updates) = List.partition (String.contains "|") input
            |> Tuple.mapFirst (List.map (String.split "|"))
            |> Tuple.mapFirst buildConnectionMap
            |> Tuple.mapSecond (List.filter (not << String.isEmpty))
    in
        (pages, updates)

type alias Connections = Dict String (List String)

buildConnectionMap : List (List String) -> Connections
buildConnectionMap pairs =
    let
        addPair : List String -> Connections -> Connections
        addPair pair dict =
            case pair of
                [a, b] ->
                    Dict.update a (addConnection b) dict
                _ ->
                    dict

        -- Helper to add a connection to a list of existing connections
        addConnection : String -> Maybe (List String) -> Maybe (List String)
        addConnection new maybeList =
            case maybeList of
                Nothing ->
                    Just [new]
                Just existing ->
                    Just (new :: existing)
    in
    List.foldl addPair Dict.empty pairs

checkOrder : Connections -> List String -> Maybe (List String)
checkOrder connections list =
    let
        checkPosition : Int -> String -> Bool
        checkPosition idx number =
            case Dict.get number connections of
                Just validNextNumbers ->
                    let
                        numbersAfter = List.drop (idx + 1) list
                    in
                    List.all (\validNext ->
                        if List.member validNext list then
                            List.member validNext numbersAfter
                        else
                            True
                    ) validNextNumbers
                Nothing ->
                    True
    in
    if List.indexedMap checkPosition list |> List.all identity then
        Just list
    else
        Nothing

checkInvalidOrder : Connections -> List String -> Maybe (List String)
checkInvalidOrder connection list =
    case checkOrder connection list of
        Nothing -> Just list
        _ -> Nothing

filterValidLists : Connections -> List (List String) -> List (List String)
filterValidLists connections instructions =
    List.filterMap (checkOrder connections) instructions

filterInvalidLists : Connections -> List (List String) -> List (List String)
filterInvalidLists connections instructions =
    List.filterMap (checkInvalidOrder connections) instructions

middle : List String -> Maybe Int
middle list =
    let
        len = List.length list
        middleIndex = len // 2  -- integer division
    in
    List.drop middleIndex list |> List.head |> Maybe.andThen String.toInt

sortByDictRules : Connections -> List String -> List String
sortByDictRules connections list =
    let
        -- Compare two elements based on dictionary rules
        compareElements : String -> String -> Order
        compareElements a b =
            case Dict.get a connections of
                Just validNexts ->
                    if List.member b validNexts then
                        GT  -- a should come before b
                    else
                        EQ
                Nothing ->
                    EQ
    in
    List.sortWith compareElements list


solver : String -> String
solver input =
    let
        (pages, updates) = String.lines (String.trim input)
            |> parser
        valid_combinations = updates |> List.map (String.split ",") |> filterValidLists pages
        invalid_combinations = updates |> List.map (String.split ",") |> filterInvalidLists pages
        invalid_sorted_combinations = List.map (sortByDictRules pages) invalid_combinations
        nums = List.filterMap (middle) valid_combinations |> List.sum
        incorrect_nums = List.filterMap (middle) invalid_sorted_combinations |> List.sum
    in
        "Part 1: " ++ Debug.toString nums ++ " Part 2: " ++ Debug.toString incorrect_nums
