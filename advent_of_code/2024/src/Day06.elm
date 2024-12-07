module Day06 exposing (main)
import Parser exposing (..)
import Html
import Set exposing (Set)
import Dict exposing (Dict)
import Puzzle06 exposing (input, puzzle_input)

-- main = Html.text (solver puzzle_input)
main = Html.text (solver puzzle_input)

type alias Position = (Int, Int)
type alias Map = Dict Position Char

parser input =
    let
        map =  String.trim input
            |> String.lines
            |> List.indexedMap (\y line ->
                String.toList line
                    |> List.indexedMap (\x char ->
                        ((x, y), char)
                    )
            )
            |> List.concat
        guard = List.filter (\(_, char) -> char == '^') map
            |> List.head
            |> Maybe.map Tuple.first
            |> Maybe.withDefault (0, 0)
    in
        (Dict.fromList map, guard)

type alias Direction = Int
-- Up = 0
-- Right = 1
-- Down = 2
-- Left = 3

turnRight : Direction -> Direction
turnRight dir =
    case dir of
        0 -> 1
        1 -> 2
        2 -> 3
        3 -> 0
        _ -> 0

lookAhead : Position -> Direction -> Position
lookAhead (x, y) dir =
    case dir of
        0 -> (x, y-1)
        1 -> (x+1, y)
        2 -> (x, y+1)
        3 -> (x-1, y)
        _ -> (x, y)

type alias State = { pos : Position , steps : Int , dir : Direction , visited : Set Position }
normalWalk : Map -> Position -> Set Position
normalWalk map startPos =
    let
        walkHelper : State -> Set Position
        walkHelper state =
            let
                nextPos = lookAhead state.pos state.dir
            in
            case Dict.get nextPos map of
                Just '#' ->
                    -- About to hit #, turn right and continue from current position
                    let
                        newDir = turnRight state.dir
                    in
                    walkHelper
                        { state
                        | dir = newDir
                        , visited = Set.insert state.pos state.visited
                        }

                Just _ ->
                    walkHelper
                        { state
                        | pos = nextPos
                        , steps = state.steps + 1
                        , visited = Set.insert nextPos state.visited
                        }

                Nothing ->
                    state.visited
    in
    walkHelper
        { pos = startPos
        , steps = 0
        , dir = 0
        , visited = Set.singleton startPos
        }


addObstacle : Position -> Dict Position Char -> Dict Position Char
addObstacle pos map =
    Dict.insert pos '#' map

type alias LoopState = { pos : Position , steps : Int , dir : Direction , visited : Set (Position, Direction) }
walk : Map -> Position -> Int -> Maybe Int
walk map startPos max_steps =
    let
        walkHelper : LoopState -> Maybe Int
        walkHelper state =
            if state.steps > max_steps then
                Just state.steps
            else
                let
                    nextPos = lookAhead state.pos state.dir
                    visitedState = (state.pos, state.dir)
                in
                if Set.member visitedState state.visited then
                    Just state.steps
                else
                    case Dict.get nextPos map of
                        Just '#' ->
                            let
                                newDir = turnRight state.dir
                            in
                            walkHelper
                                { state
                                | dir = newDir
                                , visited = Set.insert visitedState state.visited
                                }

                        Just _ ->
                            walkHelper
                                { state
                                | pos = nextPos
                                , steps = state.steps + 1
                                , visited = Set.insert visitedState state.visited
                                }

                        Nothing ->
                            Nothing  -- No loop found, walked off map
    in
    walkHelper
        { pos = startPos
        , steps = 0
        , dir = 0
        , visited = Set.empty
        }

tryObstacle : Position -> Position -> Map -> Int -> Maybe Int
tryObstacle start pos map max_steps =
        let
            newMap = addObstacle pos map
        in
        walk newMap start max_steps

findLoopingObstacle : Position -> Map -> Set Position -> Int -> Set (Int, Int)
findLoopingObstacle start map positions max_steps =
    positions
        |> Set.filter (\pos ->
            let
                loops = case tryObstacle start pos map max_steps of
                    Just steps ->
                        Just (pos, steps)
                    Nothing ->
                        Nothing
            in
                case loops of
                    Just loop -> True
                    _ -> False
        )


solver input =
    let
        (map, guard) = parser input
        normalWalkPositions = normalWalk map guard
        normalStepCount = Set.size normalWalkPositions
        looping_count = findLoopingObstacle guard map normalWalkPositions 10000
    in
      Debug.toString (normalStepCount, Debug.toString (Set.size (looping_count)))


