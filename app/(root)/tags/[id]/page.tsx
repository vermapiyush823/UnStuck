import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/localSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

const page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold uppercase text-dark100_light900">
        {result.tagTitle}
      </h1>
      <div className="mt-11 w-full">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions"
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no tag questions to show"
            description="Be the first one to break the silence! 🚀 Ask a question and kickstart the dicussion. Our query could be the next big thing others learn from."
            link="/ask-question"
            LinkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default page;
